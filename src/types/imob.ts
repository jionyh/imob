export interface Inquilino{
    id: string
    nome: string
    cpf: string
    telefone: string
}

export interface Imovel{
    inquilino: string
    endereco: string
    id:string
    iptu?: string
    valor: string
    proprietario: string
    telefone: string
}