import { db } from '../libs/firebase'
import { collection, query, orderBy, onSnapshot, QuerySnapshot, where, getDocs, doc, addDoc } from 'firebase/firestore'
import { Imovel, Inquilino } from '../types/imob'

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
        const data = querySnapshot.docs.map((doc) => doc.data())
        return data
    },
    imoveis: async()=>{
        const q = query(collection(db, 'imoveis'))
        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map((doc) => doc.data())
        return data
    },
    addInquilino: async(data:Inquilino)=>{
        const doc = await addDoc(collection(db, 'Inquilinos'),data)
        return doc
    },
    addImovel: async(data:Imovel)=>{
     await addDoc(collection(db, 'imoveis'),data) 
    }

}