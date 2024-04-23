app.service("zendeskService", [
    "$q",
    function ($q) {
        var client = ZAFClient.init();

        this.getCustomObjectRecordApi = function (objectId) {
            var deferred = $q.defer();
            client
                .request({
                    url: `/api/v2/custom_objects/anotacao/records/${objectId}`,
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

            // const options = {
            //     url: "https://flordemaio74.zendesk.com/api/v2/custom_objects/anotacao/records/01HW5FZA3WQH7BZKCVY7ZMBDSV",
            //     type: "GET",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            // };

            // return client.request(options);
        };
    },
]);
