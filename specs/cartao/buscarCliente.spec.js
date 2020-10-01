const cadastroCliente = require('../../mock/cartao/cadastro-cliente.json')
const cpf = require('cpf_cnpj').CPF
const cartao = require('../../helpers/cartao/cartao')
const faker = require('faker')


describe('Buscar cliente', ()=>{
    it('Consultar cliente', async ()=>{
        cadastroCliente.email = await `${faker.internet.userName()}@mailinator.com`
        cadastroCliente.documento = await cpf.generate()
        let res = await cartao.cadastrarCliente(cadastroCliente)
        let resBusca = await cartao.buscarCliente(cadastroCliente.documento)
        expect(resBusca.body.success).toEqual(true)
        expect(resBusca.data).toEqual(res.data)
        expect(resBusca.status).toEqual(200)
    })
    it('Consultar cliente com cpf inválido', async ()=>{
        let docInvalido = '62961498'
        let resBusca = await cartao.buscarCliente(docInvalido)
        expect(resBusca.status).toEqual(404)
    })
})