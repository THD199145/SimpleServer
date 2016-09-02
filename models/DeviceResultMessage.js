module.exports = {
    APIResultMessage : {
    // 成功
    Success: 100,
    //失败
    Fail:200,
    //参数不合法
    ParamsValid:201,
    //参数缺失
    ParamsLost:202,
    //用户名不是邮箱
    UserNameIsNotEmail:203,
    //用户名重复
    UserNameRepeat:204,
    //用户名和密码不匹配
    PasswordError:205,
    //用户不存在
    UserNotExist:209,
    //ScSv错误
    ScSvError:215,
    //数据条数不匹配
    DataCountsError:216,
    //服务器错误
    ServerError:500
    }
}