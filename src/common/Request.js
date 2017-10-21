import $ from 'jquery';
import {message} from 'antd';

function requestData(url, params, type) {
    var result = false;
    $.ajax({
        url: url,
        data: params,
        async: false,
        type: type,
        success: function (data) {
            try {
                if (typeof data==="string"){
                    data = JSON.parse(data);
                }
                result = data;
            } catch (e) {
                result = false;
            }

        },
        error: function (data) {
            result = false;
        }
    });
    return result;
}

export default requestData;