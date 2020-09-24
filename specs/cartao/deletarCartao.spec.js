const cadastroCliente = require('../../mock/cartao/cadastro-cliente.json')
const cpf = require('cpf_cnpj').CPF
const cartao = require('../../helpers/cartao/cartao')
const faker = require('faker')
const cadastroCartao= require('../../mock/cartao/cadastro-cartao.json')


describe('Deletar cartão', ()=>{
    it('deletar Cartão', async () =>{
        cadastroCliente.email = await `${faker.internet.userName()}@mailinator.com`
        cadastroCliente.documento = await cpf.generate()
        await cartao.cadastrarCliente(cadastroCliente)
        let resCartao = await cartao.cadastrarCartao(cadastroCartao, cadastroCliente.documento)
        let idCartao = resCartao.body.data
        let resDelete = await cartao.deletaCartoes(cadastroCliente.documento, idCartao)
        let res = await cartao.listaCartoes(cadastroCliente.documento)
        pos = res.body.data.map(function(e) { return e.idCartao; }).indexOf(idCartao)
        expect(resDelete.status).toEqual(200)
        expect(pos).toEqual(-1)

    })
})