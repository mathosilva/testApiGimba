const cadastroCliente = require('../../mock/cartao/cadastro-cliente.json')
const cpf = require('cpf_cnpj').CPF
const cartao = require('../../helpers/cartao/cartao')
const faker = require('faker')
const cadastroCartao= require('../../mock/cartao/cadastro-cartao.json')


describe('Cadastro de cartões', ()=>{
    it('cadastrar cartão', async () =>{
        cadastroCliente.email = await `${faker.internet.userName()}@mailinator.com`
        cadastroCliente.documento = await cpf.generate()
        await cartao.cadastrarCliente(cadastroCliente)
        let res = await cartao.cadastrarCartao(cadastroCartao, cadastroCliente.documento)
        let idCartao = res.body.data
        let resLista = await cartao.listaCartoes(cadastroCliente.documento)
        pos = resLista.body.data.map(function(e) { return e.idCartao; }).indexOf(idCartao)
        expect(resLista.body.data[pos].nomeImpresso).toEqual(cadastroCartao.nomeImpresso)
        expect(resLista.body.data[pos].mesExpiracao).toEqual(cadastroCartao.mesExpiracao)
        expect(resLista.body.data[pos].anoExpiracao).toEqual(cadastroCartao.anoExpiracao)
    })
    it('cadastrar cartão sem Cvv', async () =>{
        let cvv = '123'
        cadastroCliente.email = await `${faker.internet.userName()}@mailinator.com`
        cadastroCliente.documento = await cpf.generate()
        await cartao.cadastrarCliente(cadastroCliente)
        cadastroCartao.cvv = ''
        let res = await cartao.cadastrarCartao(cadastroCartao, cadastroCliente.documento)
        expect(res.body.success).toEqual(false)
        expect(res.body.error[0]).toEqual("'Cvv' deve ser informado.")
        cadastroCartao.cvv = cvv
    })
    it('cadastrar cartão sem Nome Impresso', async () =>{
        let nomeImpresso = 'Marcus Ferrari'
        cadastroCliente.email = await `${faker.internet.userName()}@mailinator.com`
        cadastroCliente.documento = await cpf.generate()
        await cartao.cadastrarCliente(cadastroCliente)
        cadastroCartao.nomeImpresso = ''
        let res = await cartao.cadastrarCartao(cadastroCartao, cadastroCliente.documento)
        expect(res.body.success).toEqual(false)
        expect(res.body.error[0]).toEqual("'Nome Impresso' deve ser informado.")
        cadastroCartao.nomeImpresso = nomeImpresso
    })
    it('cadastrar cartão sem Numero do cartão', async () =>{
        let numeroCartao = '4000000000000010'
        cadastroCliente.email = await `${faker.internet.userName()}@mailinator.com`
        cadastroCliente.documento = await cpf.generate()
        await cartao.cadastrarCliente(cadastroCliente)
        cadastroCartao.numeroCartao = ''
        let res = await cartao.cadastrarCartao(cadastroCartao, cadastroCliente.documento)
        expect(res.body.success).toEqual(false)
        expect(res.body.error[0]).toEqual("'Numero' deve ser informado.")
        cadastroCartao.numeroCartao = numeroCartao
    })
})