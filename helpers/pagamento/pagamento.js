const {makeRequest} = require('../main');
const pagamento = require('../../mock/pagamento/pagamento-cartao.json')
const header = require('../../mock/pagamento/headerPagamento.json')

async function realizaPagamento(){
    return await makeRequest({
        method: 'post',
        url: `${url.base}`,
        data: pagamento,
        headers: header
    });
};
async function cancelaPagamento(cancelarPagamento){ 
    return res = await makeRequest({
        method: 'put',
        url: `${url.base}${url.codProcessamento}`,
        data: cancelarPagamento,
        headers: header
    });
};
async function obterPagamento(){ 
    return res = await makeRequest({
        method: 'get',
        url: `${url.base}${url.codProcessamento}`,
        headers: header
    });
};

module.exports ={
    realizaPagamento,
    cancelaPagamento,
    obterPagamento
}