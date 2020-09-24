const cadastroCliente = require('../../mock/cartao/cadastro-cliente.json')
const cpf = require('cpf_cnpj').CPF
const cartao = require('../../helpers/cartao/cartao')
const faker = require('faker')

//Cadastro Cartao 

const cadastroCartao= require('../../mock/cartao/cadastro-cartao.json')


describe('Listagem de cartões', ()=>{
    it('listar Cartões', async ()=>{
        cadastroCliente.email = await `${faker.internet.userName()}@mailinator.com`
        cadastroCliente.documento = await cpf.generate()
        await cartao.cadastrarCliente(cadastroCliente)
        await cartao.cadastrarCartao(cadastroCartao, cadastroCliente.documento)
        let res = await cartao.listaCartoes(cadastroCliente.documento)
        expect(res.body.data.length).toEqual(1)
    })
})