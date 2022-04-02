const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')
    ;
(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        /*
        UPDATE: 22/03/2022
        Se você estiver executando esse código após o ano de 2020. 
        O calculo para saber o ano de nascimento da pessoa vai ser diferente do esperado.
        
        Nas próximas aulas você vai entender como resolver este problema usando fakeTimers. 
        Mas por agora, adicionei o código abaixo para mockar o Date.
        */
        Date.prototype.getFullYear = () => 2020
        const filePath = './mocks/threeItems-valid.csv'
        const result = await File.csvToJson(filePath)
        const expected = [
            {
                "name": "Antonio da Silva",
                "id": 123,
                "profession": "JS Senior Developer",
                "birthDay": 1980
            },
            {
                "name": "Chica Nunes",
                "id": 321,
                "profession": "JS Specialist",
                "birthDay": 1940
            },
            {
                "name": "Joaozinho Trinta",
                "id": 231,
                "profession": "JS Tech Leader",
                "birthDay": 1950
            }
        ]

        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))

    }
})()