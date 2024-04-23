app.service("zendeskService", [
    "$q",
    function ($q) {
        var client = ZAFClient.init();

        this.getCurrentUser = function () {
            var deferred = $q.defer();
            client
                .get("currentUser")
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        this.lookupCustomObjectRelationship = function (userId) {
            var deferred = $q.defer();
            var fieldId = "28714579779347";
            client
                .request({
                    url: `/api/v2/zen:user/${userId}/relationship_fields/${fieldId}/zen:custom_object:anotacao`,
                    type: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        this.createCustomObjectRecord = function (objectToCreate) {
            var deferred = $q.defer();
            client
                .request({
                    url: `/api/v2/custom_objects/anotacao/records`,
                    type: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: JSON.stringify(objectToCreate),
                })
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };
    },
]);
