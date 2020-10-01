const {makeRequest} = require('../../helpers/main');
const pagamento = require('../../helpers/pagamento/pagamento')

describe('Obter Pagamento', ()=>{
    it('Obter Pagamento', async ()=>{
    let resPag = await pagamento.realizaPagamento()
    let codCobranca = resPag.body.data.codigoCobranca
    let valor = resPag.body.data.valorTotal
    url.codProcessamento = resPag.body.data.codigoGatewayProcessamento
    let res = await pagamento.obterPagamento()
    expect(res.status).toEqual(200)
    expect(res.body.data.codigoCobranca).toEqual(codCobranca)
    expect(res.body.data.valorTotal).toEqual(valor)
    })
    it('Obter Pagamento Inexistente',async  ()=>{
        url.codProcessamento = 'sdafafaegr'
        let res = await pagamento.obterPagamento()
        expect(res.status).toEqual(400)
        expect(res.body.error[0]).toEqual('Pedido não encontrado')
    })
})