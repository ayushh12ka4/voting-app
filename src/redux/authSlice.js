import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/config";


//registration---------------------------------------------------------------



export const registerUser = createAsyncThunk(
  "register/user",
  async ({ email, password }, thunkAPI) => {
    try {
      // create auth user
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      // create a minimal user document in Firestore (UID = doc id)
      const userDoc = {
        uid: userCred.user.uid,
        email: userCred.user.email,
        role: "user",
        voterId: `VTR-${Date.now()}`,    // auto-generated voter ID
        votedElections: [],             // list of election IDs user has voted in
        createdAt: Date.now()
      };

      await setDoc(doc(db, "users", userCred.user.uid), userDoc);

      // send verification mail (optional flow — user can still complete profile)
      await sendEmailVerification(userCred.user);

      return {
        uid: userCred.user.uid,
        email: userCred.user.email,
        emailVerified: userCred.user.emailVerified
      };
    } catch (error) {
      // return readable message to component
      const message = error.code === "auth/email-already-in-use"
        ? "This email is already registered. Try logging in."
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//login-----------------------------------------------------------------------

export const loginUser=createAsyncThunk(
    "login/user",
    async({email,password},thunkAPI)=>{
        try {
            const userCred=await signInWithEmailAndPassword(auth,email,password)
            
            
            return{
                uid:userCred.user.uid,
                email:userCred.user.email,
                emailVerified:userCred.user.emailVerified
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)
//logout----------------------------------------------------------------------
export const logoutUser=createAsyncThunk(
    "logout/user",
    async(_,thunkAPI)=>{
        try {
           await signOut(auth)
            
            
            return true
    
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const initialState={
    user:null,
    status:"idle",
    error:null
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    }
  },
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.user=action.payload
            state.status='succeeded'
            state.error = null
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.error=action.payload
            state.status='failed'
        })
        .addCase(registerUser.pending,(state)=>{
            state.error=null
            state.status='pending'
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.user=action.payload
            state.status='succeeded'
            state.error = null
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.error=action.payload
            state.status='failed'
        })
        .addCase(loginUser.pending,(state)=>{
            state.error=null
            state.status='pending'
        })
        .addCase(logoutUser.fulfilled,(state,action)=>{
            state.user=null
            state.status='idle'
             state.error = null
        })
        .addCase(logoutUser.rejected,(state,action)=>{
            state.error=action.payload
            state.status='failed'
        })
        .addCase(logoutUser.pending,(state)=>{
            state.error=null
            state.status='pending'
        })
    }
})
export const { resetStatus } = authSlice.actions
export default authSlice.reducer