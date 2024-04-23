app.controller("AppController", [
    "$scope",
    "zendeskService",

    function ($scope, zendeskService) {
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
                            var objectToCreate = {
                                custom_object_record: {
                                    custom_object_fields: {
                                        agente: userId,
                                        texto_nota: "",
                                    },
                                    name: `Notas ${userName}`,
                                },
                            };
                            return zendeskService
                                .createCustomObjectRecord(objectToCreate)
                                .then((response) => {
                                    console.log("Um objeto de notas foi criado");
                                    console.log(response);
                                });
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

        client.on("pane.deactivated", function () {
            //handler code
        });
    },
]);
