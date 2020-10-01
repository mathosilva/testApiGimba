const cadastroCliente = require('../../mock/cartao/cadastro-cliente.json')
const cpf = require('cpf_cnpj').CPF
const cartao = require('../../helpers/cartao/cartao')
const faker = require('faker')

//Cadastro Cartao 

const cadastroCartao= require('../../mock/cartao/cadastro-cartao.json')


describe('Cadastro de cliente', ()=>{
    it('Cadastrar cliente', async ()=>{
        cadastroCliente.email = await `${faker.internet.userName()}@mailinator.com`
        cadastroCliente.documento = await cpf.generate()
        let res = await cartao.cadastrarCliente(cadastroCliente)
        expect(res.body.success).toEqual(true)
        expect(res.status).toEqual(200)
    })
    it('cadastrar cliente com CPF inválido', async() =>{
        cadastroCliente.email = await `${faker.internet.userName()}@mailinator.com`
        cadastroCliente.documento = '43298097021'
        let res = await cartao.cadastrarCliente(cadastroCliente)
        expect(res.body.success).toEqual(false)
        expect(res.status).toEqual(400)
        expect(res.body.error[0]).toEqual("O CPF é inválido!")
    })
    it('cadastrar cliente sem CPF', async() =>{
        cadastroCliente.email = await `${faker.internet.userName()}@mailinator.com`
        cadastroCliente.documento = '43298097021'
        let res = await cartao.cadastrarCliente(cadastroCliente)
        expect(res.body.success).toEqual(false)
        expect(res.status).toEqual(400)
        expect(res.body.error[0]).toEqual("O CPF é inválido!")
    })
    it('cadastrar cliente com E-mail inválido', async() =>{
        cadastroCliente.email = 'jamal@mailinator'
        cadastroCliente.documento = await cpf.generate()
        let res = await cartao.cadastrarCliente(cadastroCliente)
        expect(res.body.success).toEqual(false)
        expect(res.status).toEqual(400)
        expect(res.body.error[0]).toEqual("Não foi possível adicionar o cliente no Gateway de Pagamento.")
    })
    it('cadastrar cliente sem E-mail', async() =>{
        cadastroCliente.email = ''
        cadastroCliente.documento = await cpf.generate()
        let res = await cartao.cadastrarCliente(cadastroCliente)
        expect(res.body.success).toEqual(false)
        expect(res.status).toEqual(400)
        expect(res.body.error[0]).toEqual("'Email' é um endereço de email inválido.")
    })
})