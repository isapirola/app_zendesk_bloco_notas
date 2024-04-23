app.controller("AppController", [
    "$scope",
    "zendeskService",
    function ($scope, zendeskService) {
        var client = ZAFClient.init();

        var objectId = "01HW67N3TRR2F6PZMXTVNDRY81";

        zendeskService
            .getCurrentUser()
            .then((response) => {
                var userName = response.currentUser.name;
                var userId = response.currentUser.id;

                // Aqui userId estará definido, então você pode fazer a chamada para lookupCustomObjectRelationship
                return zendeskService
                    .lookupCustomObjectRelationship(userId)
                    .then((response) => {
                        if (response.count == 1) {
                            $scope.textoNota =
                                response.custom_object_records[0].custom_object_fields.texto_nota;
                        } else if (response.count == 0) {
                        } else {
                            $scope.textoNota =
                                "Existe mais de um objeto de notas atribuido ao usuário atual, favor pedir ajuda para a administração";
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        console.log(
                            "Não foi possível obter dados da relação do objeto com o agente"
                        );
                    });
            })
            .catch(function (error) {
                console.error(error);
                console.log("Não foi possível obter dados do usuário atual");
            });

        zendeskService
            .getCustomObjectRecordApi(objectId)
            .then((response) => {
                // $scope.textoNota =
                //     response.custom_object_record.custom_object_fields.texto_nota;
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
