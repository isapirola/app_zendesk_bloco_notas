app.controller("AppController", [
    "$scope",
    "zendeskService",
    function ($scope, zendeskService) {
        // Função para buscar registro do objeto personalizado
        $scope.getCustomObjectRecord = function () {
            // Chamar o serviço para buscar o registro do objeto personalizado
            zendeskService
                .getCustomObjectRecordApi()
                .then((response) => {
                    // Manipular a resposta da API aqui
                    $scope.objectText =
                        response.custom_object_record.custom_object_fields.texto_nota;
                })
                .catch(function (error) {
                    // Manipular erros aqui
                    console.error(error);
                });
        };
        // Chamada inicial para a função
        $scope.getCustomObjectRecord();
    },
]);
