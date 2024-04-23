app.controller("AppController", [
    "$scope",
    "zendeskService",
    function ($scope, zendeskService) {
        var client = ZAFClient.init();
        var objectId = "01HW5FZA3WQH7BZKCVY7ZMBDSV";

        zendeskService
            .getCustomObjectRecordApi(objectId)
            .then((response) => {
                console.log(response.custom_object_record.custom_object_fields.texto_nota);
                $scope.textoNota =
                    response.custom_object_record.custom_object_fields.texto_nota;
            })
            .catch(function (error) {
                console.error(error);
            });
    },

    // Função para buscar registro do objeto personalizado
    // $scope.getCustomObjectRecord = function () {
    //     // Chamar o serviço para buscar o registro do objeto personalizado
    //     zendeskService
    //         .getCustomObjectRecordApi()
    //         .then((response) => {
    //             // Manipular a resposta da API aqui
    //             console.log(response.custom_object_record.custom_object_fields.texto_nota);
    //             $scope.note = response.custom_object_record.custom_object_fields;
    //         })
    //         .catch(function (error) {
    //             // Manipular erros aqui
    //             console.error(error);
    //         });
    // };
    // // Chamada inicial para a função
    // $scope.getCustomObjectRecord();
]);
