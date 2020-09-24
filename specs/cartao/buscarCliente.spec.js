const cadastroCliente = require('../../mock/cartao/cadastro-cliente.json')
const cpf = require('cpf_cnpj').CPF
const cartao = require('../../helpers/cartao/cartao')
const faker = require('faker')

//Cadastro Cartao 

const cadastroCartao= require('../../mock/cartao/cadastro-cartao.json')


describe('Buscar cliente', ()=>{
    it('Consultar cliente', async ()=>{
        cadastroCliente.email = await `${faker.internet.userName()}@mailinator.com`
        cadastroCliente.documento = await cpf.generate()
        let res = await cartao.cadastrarCliente(cadastroCliente)
        let resBusca = await cartao.buscarCliente(cadastroCliente.documento)
        expect(resBusca.body.success).toEqual(true)
        expect(resBusca.data).toEqual(res.data)
    })
})