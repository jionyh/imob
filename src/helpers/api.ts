import { db } from '../libs/firebase'
import { collection, query,where, getDocs, updateDoc, doc, deleteDoc, setDoc } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import Cookies from 'js-cookie'

import {v4 as uuid} from 'uuid'

import { Imovel, Inquilino } from '../types/imob'

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
    addInquilino: async(nome:string, cpf:string, telefone:string)=>{

        const data = {
            nome,cpf,telefone, id: uuid()
        }

        await setDoc(doc(db, 'Inquilinos', data.id),data)
    },
    addImovel: async(endereco:string,iptu:string,valor:string,proprietario:string,telefone:string,inquilino:string)=>{
        const data:Imovel = {
            endereco,iptu,proprietario,telefone,valor, inquilino, id:uuid()
        }
     await setDoc(doc(db, 'imoveis', data.id),data)
    },
    editImovel: async(endereco:string,iptu:string,valor:string,proprietario:string,telefone:string,inquilino:string, id:string)=>{
        const data= {
            endereco,iptu,proprietario,telefone,valor, inquilino
        }

        console.log('data',data)
        
     const res = await updateDoc(doc(db, 'imoveis', id),data)
     console.log(res)
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