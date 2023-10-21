const axios = require('axios');
const axiosRetry = require('axios-retry');

const axiosClient = axios.create({
    baseURL: 'https://api-sam104482.sam.prismacloud.io'
});
axiosRetry(axiosClient, {
    retries: 3,
    shouldResetTimeout: true,
    retryCondition: (error) => true,
    retryDelay: (count) => {
        console.warn('Request failed', { count });
        return 10;
    }
});

(async () => {
    try {
        const request = await axiosClient.request({
            method: 'POST',
            url: '/_service/auth-server/api/v1/oauth/token?grant_type=client_credentials',
            timeout: 1500,
            headers: {
                Authorization: 'Basic YmMtcHJvdmlzaW9uZXI6c2VjcmV0MTIz'
            }
        });
        console.log(request.data)
    } catch (error) {
        // console.log(error.response)
    }
})();