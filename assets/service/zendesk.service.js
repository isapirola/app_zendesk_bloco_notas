app.service("zendeskService", function () {
    this.getCustomObjectRecordApi = function () {
        const options = {
            url: "https://flordemaio74.zendesk.com/api/v2/custom_objects/anotacao/records/01HW5FZA3WQH7BZKCVY7ZMBDSV",
            type: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Basic " + btoa("isabela.pirola@viaconsulting.com.br:Isapirol@0704"),
            },
        };

        return client.request(options);
    };
});
