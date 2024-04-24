app.controller("AppController", [
    "$scope",
    "zendeskService",

    function ($scope, zendeskService) {
        var userName;
        var userId;
        var texto_velho;
        var texto_novo;
        var objectId;

        client.on("app.registered", function () {
            zendeskService
                .getCurrentUser()
                .then((response) => {
                    userName = response.currentUser.name;
                    userId = response.currentUser.id;

                    // Aqui userId estará definido, então você pode fazer a chamada para lookupCustomObjectRelationship
                    return zendeskService
                        .lookupCustomObjectRelationship(userId)
                        .then((response) => {
                            if (response.count == 1) {
                                objectId = response.custom_object_records[0].id;
                                $scope.textoNota =
                                    response.custom_object_records[0].custom_object_fields.texto_nota;
                                texto_velho = $scope.textoNota;
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
        });

        client.on("pane.deactivated", function () {
            texto_novo = $scope.textoNota;

            if (texto_novo != texto_velho) {
                var objectToUpdate = {
                    custom_object_record: {
                        custom_object_fields: {
                            texto_nota: texto_novo,
                        },
                    },
                };

                zendeskService
                    .updateCustomObjectRecord(objectId, objectToUpdate)
                    .then((response) => {
                        texto_velho = texto_novo;
                    })
                    .catch((error) => {
                        console.error(error);
                        console.log("Não foi possível atualizar o texto do objeto");
                    });
            }
        });
    },
]);
