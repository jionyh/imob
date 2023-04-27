import { db } from '../libs/firebase'
import { collection, query,where, getDocs, addDoc, doc, deleteDoc, setDoc } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import Cookies from 'js-cookie'

import { Imovel, Inquilino } from '../types/imob'

type LoginProps = {
    email: string
    password: string
}
const auth = getAuth()

export const api = {
    inquilinos: async()=>{
        const q = query(collection(db, 'Inquilinos'))
        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map((doc) => doc.data())
        return data
    },
    inquilinoId : async (id:string) => {
        const q = query(collection(db, 'Inquilinos'), where('id', '==', id))
        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map((doc) => doc.data())
        return data
      },
    imovelId: async(id:string)=>{
        const q = query(collection(db, 'imoveis'), where('id', '==', id))
        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map((doc) =>doc.data())
        return data
    },
    imoveis: async()=>{
        const q = query(collection(db, 'imoveis'))
        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map((doc) => doc.data() )
        return data
    },
    addInquilino: async(data:Inquilino)=>{
        const doc = await addDoc(collection(db, 'Inquilinos'),data)
        return doc
    },
    addImovel: async(data:Imovel)=>{
     await setDoc(doc(db, 'imoveis', data.id),data)
    },
    delImovel: async(id:string)=>{
        await deleteDoc(doc(db,'imoveis', id))
    },
    login: async(email:string, password:string)=>{
       try{
        const res = await signInWithEmailAndPassword(auth,email,password)
        if(res){
            const data:any = res
            Cookies.set('imobToken', data.user.accessToken)
            return true
        }
       }catch(e){
        return {status: false,message:'Usuario ou Senha Incorreto'}
       }
        
    }
 
    
  
    

}