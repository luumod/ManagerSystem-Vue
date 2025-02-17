#include "Server.h"
#include "SResultCode.h"
#include "SSqlConnectionPool.h"
#include "SHttpPartParse.h"
#include "SHttpResponseBuilder.h"
#include "SJwt.h"
#include <QCoreApplication>
#include <QJsonDocument>
#include <QJsonObject>
#include <QJsonArray>
#include <QJsonValue>
#include <QJsonParseError>
#include <QFile>
#include <QFileInfo>
#include <QDir>
#include <optional>
#include <QRandomGenerator>
#include <QRegularExpression>
#include <QUuid>
#include <QImage>

QJsonArray createMenuJson(int user_id) {

	// 创建data数组
	QJsonArray dataArray;

	// 1. 首页菜单项
	QJsonObject homeItem;
	homeItem.insert("id", 1);
	homeItem.insert("name", "首页");
	homeItem.insert("type", 1);
	homeItem.insert("url", "/main/home");
	homeItem.insert("icon", "el-icon-House");
	homeItem.insert("sort", 1);

	QJsonArray homeChildren;
	// 系统概况子项
	QJsonObject overview;
	overview.insert("id", 2);
	overview.insert("url", "/main/home/overview");
	overview.insert("name", "系统概况");
	overview.insert("sort", 101);
	overview.insert("type", 2);
	overview.insert("children", QJsonValue::Null);
	overview.insert("parentId", 1);
	homeChildren.append(overview);

	// 最新动态子项
	QJsonObject news;
	news.insert("id", 3);
	news.insert("url", "/main/home/news");
	news.insert("name", "最新动态");
	news.insert("sort", 102);
	news.insert("type", 2);
	news.insert("children", QJsonValue::Null);
	news.insert("parentId", 1);
	homeChildren.append(news);

	// 推荐操作子项
	QJsonObject recommended;
	recommended.insert("id", 4);
	recommended.insert("url", "/main/home/recommended"); // 注意原数据中有拼写差异
	recommended.insert("name", "推荐操作");
	recommended.insert("sort", 103);
	recommended.insert("type", 2);
	recommended.insert("children", QJsonValue::Null);
	recommended.insert("parentId", 1);
	homeChildren.append(recommended);

	homeItem.insert("children", homeChildren);
	dataArray.append(homeItem);

	// 2. 图片上传菜单项
	QJsonObject uploadItem;
	uploadItem.insert("id", 5);
	uploadItem.insert("name", "图片上传");
	uploadItem.insert("type", 1);
	uploadItem.insert("url", "/main/upload");
	uploadItem.insert("icon", "el-icon-Upload");
	uploadItem.insert("sort", 2);

	QJsonArray uploadChildren;
	// 单张图片上传
	QJsonObject singleUpload;
	singleUpload.insert("id", 6);
	singleUpload.insert("url", "/main/upload/single");
	singleUpload.insert("name", "单张图片上传");
	singleUpload.insert("sort", 201);
	singleUpload.insert("type", 2);
	singleUpload.insert("children", QJsonValue::Null);
	singleUpload.insert("parentId", 5);
	uploadChildren.append(singleUpload);

	// 批量图片上传
	QJsonObject bulkUpload;
	bulkUpload.insert("id", 7);
	bulkUpload.insert("url", "/main/upload/bulk");
	bulkUpload.insert("name", "批量图片上传");
	bulkUpload.insert("sort", 202);
	bulkUpload.insert("type", 2);
	bulkUpload.insert("children", QJsonValue::Null);
	bulkUpload.insert("parentId", 5);
	uploadChildren.append(bulkUpload);

	uploadItem.insert("children", uploadChildren);
	dataArray.append(uploadItem);

	// 3. 个人仓库（无子项）
	QJsonObject storageItem;
	storageItem.insert("id", 8);
	storageItem.insert("name", "个人仓库");
	storageItem.insert("type", 1);
	storageItem.insert("url", "/main/storage");
	storageItem.insert("icon", "el-icon-Folder");
	storageItem.insert("sort", 3);
	storageItem.insert("children", QJsonValue::Null);
	dataArray.append(storageItem);

	// 4. 图片加工（无子项）
	QJsonObject editItem;
	editItem.insert("id", 9);
	editItem.insert("name", "图片加工");
	editItem.insert("type", 1);
	editItem.insert("url", "/main/edit");
	editItem.insert("icon", "el-icon-Picture");
	editItem.insert("sort", 4);
	editItem.insert("children", QJsonValue::Null);
	dataArray.append(editItem);

	// 5. 系统管理
	QJsonObject systemItem;
	systemItem.insert("id", 10);
	systemItem.insert("name", "系统管理");
	systemItem.insert("type", 1);
	systemItem.insert("url", "/main/system");
	systemItem.insert("icon", "el-icon-Setting");
	systemItem.insert("sort", 5);

	QJsonArray systemChildren;
	// 用户管理
	QJsonObject userManage;
	userManage.insert("id", 11);
	userManage.insert("url", "/main/system/user");
	userManage.insert("name", "用户管理");
	userManage.insert("sort", 301);
	userManage.insert("type", 2);
	userManage.insert("children", QJsonValue::Null);
	userManage.insert("parentId", 10);
	systemChildren.append(userManage);

	// 图片管理
	QJsonObject imageManage;
	imageManage.insert("id", 12);
	imageManage.insert("url", "/main/system/image");
	imageManage.insert("name", "图片管理");
	imageManage.insert("sort", 302);
	imageManage.insert("type", 2);
	imageManage.insert("children", QJsonValue::Null);
	imageManage.insert("parentId", 10);
	systemChildren.append(imageManage);

	// 标签管理
	QJsonObject labelManage;
	labelManage.insert("id", 13);
	labelManage.insert("url", "/main/system/label");
	labelManage.insert("name", "标签管理");
	labelManage.insert("sort", 303);
	labelManage.insert("type", 2);
	labelManage.insert("children", QJsonValue::Null);
	labelManage.insert("parentId", 10);
	systemChildren.append(labelManage);

	systemItem.insert("children", systemChildren);
	dataArray.append(systemItem);

	// 6. 共享社区（无子项）
	QJsonObject communityItem;
	communityItem.insert("id", 14);
	communityItem.insert("name", "共享社区");
	communityItem.insert("type", 1);
	communityItem.insert("url", "/main/community");
	communityItem.insert("icon", "el-icon-Share");
	communityItem.insert("sort", 6);
	communityItem.insert("children", QJsonValue::Null);
	dataArray.append(communityItem);

	// 7. 个人信息（无子项）
	QJsonObject profileItem;
	profileItem.insert("id", 15);
	profileItem.insert("name", "个人信息");
	profileItem.insert("type", 1);
	profileItem.insert("url", "/main/profile");
	profileItem.insert("icon", "el-icon-User");
	profileItem.insert("sort", 7);
	profileItem.insert("children", QJsonValue::Null);
	dataArray.append(profileItem);


	return dataArray;
}


#define resSuccess(data,responder)\
	SHttpResponseBuilder(data, QHttpServerResponder::StatusCode::Ok)\
	.addCORS()\
	.addHeader("Content-Type", "application/json")\
	.send(responder); \

#define resNoContent(responder)\
	SHttpResponseBuilder(QHttpServerResponder::StatusCode::NoContent)\
	.addCORS()\
	.addHeader("Content-Type", "application/json")\
	.send(responder); \

#define resError(data, responder)\
	SHttpResponseBuilder(data,QHttpServerResponder::StatusCode::BadRequest)\
	.addCORS()\
	.addHeader("Content-Type", "application/json")\
	.send(responder); \

#define CheckJsonParse(request,responder)\
	QJsonParseError error;\
	auto jdom = QJsonDocument::fromJson(request.body(), &error);\
	if (error.error != QJsonParseError::NoError) {\
		resError(SResult::error(SResultCode::ParamJsonInvalid), responder)\
		return;\
	}\

#define CheckSqlQuery(query,responder)\
	if (query.lastError().type() != QSqlError::NoError) {\
		resError(SResult::error(SResultCode::ServerSqlQueryError), responder)\
		return;\
	}\

//检查user_id是否为有效整数
#define CheckIsInt(user_id,responder)\
	bool ok;\
	int u_id = user_id.toInt(&ok);\
	if (!ok) {\
		resError(SResult::error(SResultCode::UserNotFound), responder)\
		return;\
	}

//密钥
const char* SCRETKEY = "Yuleo666";

QJsonObject recordToJson(const QSqlRecord& record) {
	QJsonObject juser;
	for (size_t i = 0; i < record.count(); i++) {
		const auto& v = record.value(i);
		switch (v.typeId())
		{
		case QMetaType::Bool:
			juser.insert(record.fieldName(i), record.value(i).toBool());
			break;
		case QMetaType::Int:
		case QMetaType::Short:
		case QMetaType::UShort:
		case QMetaType::LongLong:
		case QMetaType::ULongLong:
			juser.insert(record.fieldName(i), record.value(i).toInt());
			break;
		case QMetaType::Float:
		case QMetaType::Double:
			juser.insert(record.fieldName(i), record.value(i).toDouble());
			break;
		default:
			juser.insert(record.fieldName(i), record.value(i).toString());
			break;
		}
	}
	return juser;
}

std::optional<QByteArray> CheckToken(const QHttpServerRequest& request) {
	//校验token
	auto auth = request.value("Authorization"); //从headers字段中获取
	//无token
	if (auth.isEmpty()) {
		//其次从url参数中获取
		if (request.query().hasQueryItem("token")) {
			auto auth_s = request.query().queryItemValue("token"); //从url参数中获取
			if (auth_s.isEmpty()) {
				return SResult::error(SResultCode::UserUnauthenticated);
			}
			else {
				auth = QString("Bearer" + auth_s).toLocal8Bit();
			}
		}
		else {
			return SResult::error(SResultCode::UserAuthFormatError);
		}
	}
	
	//token不符合规范
	if (!auth.startsWith("Bearer")) {
		return SResult::error(SResultCode::UserAuthFormatError);
	}
	//取得token
	auto token = auth.mid(strlen("Bearer")); //去掉前缀 获取从位置6-end的token
	auto jwtObject = SJwt::SJwtObject::decode(token, SJwt::SAlgorithm::HS256, SCRETKEY);
	switch (jwtObject.status())
	{
	case SJwt::SJwtObject::Status::Invalid:
		return SResult::error(SResultCode::UserAuthInvalid);
	case SJwt::SJwtObject::Status::Expired:
		return SResult::error(SResultCode::UserAuthExpired);
	default:
		return {};
	}
}

Server::Server()
{
#define checkCORS_OPTIONS(path) \
	if (path.contains("<arg>/<arg>")){\
		m_server.route(path, QHttpServerRequest::Method::Options, \
			[](const QString& arg ,const QString& arg2 ,const QHttpServerRequest& request, QHttpServerResponder&& responder) { \
			resNoContent(responder); \
			}); \
	}\
	else if (path.contains("<arg>")){\
		m_server.route(path, QHttpServerRequest::Method::Options, \
			[](const QString& arg ,const QHttpServerRequest& request, QHttpServerResponder&& responder) { \
			resNoContent(responder); \
			}); \
	}\
	else {\
		m_server.route(path, QHttpServerRequest::Method::Options, \
			[](const QHttpServerRequest& request, QHttpServerResponder&& responder) { \
			resNoContent(responder); \
			}); \
	}\

	//开启服务器
	m_server.listen(QHostAddress::Any, 8888);

	//添加路径丢失处理
	m_server.setMissingHandler([](const QHttpServerRequest& request,
		QHttpServerResponder&& responder) {
			QJsonObject json;
			json.insert("code", "3000");
			json.insert("message", "不支持此操作");
			responder.write(QJsonDocument(json));
		});

	QDir::setCurrent(QCoreApplication::applicationDirPath());

	//添加路由
	checkCORS_OPTIONS(QString("/api/version"));
	checkCORS_OPTIONS(QString("/login"));
	checkCORS_OPTIONS(QString("/register"));
	checkCORS_OPTIONS(QString("/user/<arg>"));
	checkCORS_OPTIONS(QString("/user/list"));
	checkCORS_OPTIONS(QString("/user/create"));
	checkCORS_OPTIONS(QString("/users"));
	checkCORS_OPTIONS(QString("/user/<arg>/avatar"));
	checkCORS_OPTIONS(QString("/public/images/avatar/<arg>"));

	checkCORS_OPTIONS(QString("/image/list/<arg>"));
	checkCORS_OPTIONS(QString("/image/upload/<arg>"));
	checkCORS_OPTIONS(QString("/image/<arg>"));
	checkCORS_OPTIONS(QString("/images"));
	checkCORS_OPTIONS(QString("/public/images/upload/<arg>/<arg>"));

	checkCORS_OPTIONS(QString("/check/account/<arg>"));
	checkCORS_OPTIONS(QString("/role/<arg>/menu"));

	m_server.route("/api/version", [](const QHttpServerRequest& request, QHttpServerResponder&& responder) {
		QJsonObject json;
		json.insert("version", "1.0.0");
		json.insert("name", "UserImageManager-Server");
		json.insert("datetime", QDateTime::currentDateTime().toString("yyyy-MM-dd HH:mm:ss"));
		json.insert("copyright", "Copyright © 2025 Yuleo");

		resSuccess(QJsonDocument(json).toJson(QJsonDocument::Compact), responder);
		return ;
		});
	const QString UPLOAD_DIR = QCoreApplication::applicationDirPath() + "/images/";
	const QString URL_PREFIX = "/images/";
	auto p = QUuid::createUuid().toString();
	route_userLogin();
	route_managerUserSystem();
	route_imageManagement();
	route_advancedQuery();
}

void Server::route_userLogin()
{
	//用户登录
	m_server.route("/login",
		[](const QHttpServerRequest& request, QHttpServerResponder&& responder) {
		
		CheckJsonParse(request,responder);
		SSqlConnectionWrap wrap;
		QSqlQuery query(wrap.openConnection());
		query.prepare(QString("SELECT * FROM user_info WHERE user_account='%1' AND password='%2' LIMIT 1")
			.arg(jdom["user_account"].toString())
			.arg(jdom["password"].toString()));
		query.exec();
#if _DEBUG
		qDebug() << "用户登录" << query.lastQuery();
#endif
		CheckSqlQuery(query,responder);

		//是否查询到数据
		if (!query.next()) {
			resError(SResult::error(SResultCode::UserLoginError), responder);
			return;
		}

		//检查用户是否禁用
		if (query.value("isEnable").toInt() == 2) {
			resError(SResult::error(SResultCode::UserDisabled), responder);
			return;
		}

		//检查用户是否被删除
		if (query.value("isDeleted").toBool()) {
			resError(SResult::error(SResultCode::UserDeleted), responder);
			return;
		}

		//生成token jwt
		QJsonObject payLoad = {
			{"user_account", jdom["user_account"]},
			{"iat",QDateTime::currentDateTime().toString(Qt::DateFormat::ISODate)},
			{"exp",QDateTime::currentDateTime().addDays(7).toString(Qt::DateFormat::ISODate)}
		};
		SJwt::SJwtObject jwtObject(SJwt::SAlgorithm::HS256, payLoad, SCRETKEY);


		QJsonObject jLoginUser;
		jLoginUser.insert("id", query.value("id").toString());
		jLoginUser.insert("user_account", query.value("user_account").toString());
		jLoginUser.insert("user_name", query.value("user_name").toString());
		jLoginUser.insert("password", query.value("password").toString());
		jLoginUser.insert("gender", query.value("gender").toInt());
		jLoginUser.insert("mobile", query.value("mobile").toString());
		jLoginUser.insert("email", query.value("email").toString());
		jLoginUser.insert("avatar_path", query.value("avatar_path").toString());
		jLoginUser.insert("isEnable", 1);
		jLoginUser.insert("isDeleted", false);
		jLoginUser.insert("has_image_count", query.value("has_image_count").toInt());
		jLoginUser.insert("token", QString(jwtObject.jwt()));

		//{ {"token",QString(jwtObject.jwt())} }
		resSuccess(SResult::success(jLoginUser), responder);
		return;
		});

	//用户注册
	m_server.route("/register", QHttpServerRequest::Method::Post,
		[](const QHttpServerRequest& request, QHttpServerResponder&& responder) {
		CheckJsonParse(request,responder);

		SSqlConnectionWrap wrap;
		QSqlQuery query(wrap.openConnection());
		query.prepare("INSERT IGNORE INTO user_info (user_account, password, user_name, gender) VALUES (?,?,?,?)");
		query.bindValue(0, jdom["user_account"].toString());
		query.bindValue(1, jdom["password"].toString());
		query.bindValue(2, jdom["user_name"].toString());
		query.bindValue(3, jdom["gender"].toInt());
		query.exec();
#if _DEBUG
		qDebug() << "用户注册";
		qDebug() << query.lastQuery();
#endif
		CheckSqlQuery(query,responder);

		//检查是否插入成功
		if (query.numRowsAffected() == 0) {
			resError(SResult::error(SResultCode::UserAlreadyExists), responder);
			return;
		}
		//注册成功

		resSuccess(SResult::success(), responder);
		return;
		});
}

void Server::route_managerUserSystem()
{
	//查询某个用户
	m_server.route("/user/<arg>", QHttpServerRequest::Method::Get,
		[](const QString& id, const QHttpServerRequest& request, QHttpServerResponder&& responder){
		//校验参数
		std::optional<QByteArray> token = CheckToken(request);
		if (token.has_value()) { //token校验失败
			resError(token.value(), responder);
			return;
		}

		CheckIsInt(id,responder);

		SSqlConnectionWrap wrap;
		QSqlQuery query(wrap.openConnection());

		QString sql = "SELECT * FROM user_info where isDeleted=false AND id=%1";
		query.prepare(sql.arg(u_id));
		query.exec();
#if _DEBUG
		qDebug() << "查询用户信息";
		qDebug() << query.lastQuery()<<'\n';
#endif
		CheckSqlQuery(query, responder);

		//查询到数据
		if (!query.next()) {
			resError(SResult::error(SResultCode::UserNotFound), responder);
			return;
		}

		resSuccess(SResult::success(recordToJson(query.record())), responder);
		return;
		});
	
	//用户列表查询
	m_server.route("/user/list", QHttpServerRequest::Method::Post,
		[=](const QHttpServerRequest& request, QHttpServerResponder&& responder) {
		CheckJsonParse(request, responder);

		//校验参数
		std::optional<QByteArray> token = CheckToken(request);
		if (token.has_value()) { //token校验失败
			resError(token.value(), responder);
			return;
		}

		auto page = jdom["page"].toInt();
		auto pageSize = jdom["pageSize"].toInt();
		auto user_account = jdom["user_account"].toString();
		auto user_name = jdom["user_name"].toString();
		auto mobile = jdom["mobile"].toString();
		auto email = jdom["email"].toString();
		auto gender = jdom["gender"].toInt();
		auto isEnable = jdom["isEnable"].toInt();

		QString filter = "WHERE isDeleted=false ";
		//模糊搜索
		if (!user_account.isEmpty()) {
			filter += QString(" AND user_account LIKE '%%1%'").arg(user_account);
		}
		if (!user_name.isEmpty()) {
			filter += QString(" AND user_name LIKE '%%1%'").arg(user_name);
		}
		if (!mobile.isEmpty()) {
			filter += QString(" AND mobile LIKE '%%1%'").arg(mobile);
		}
		if (!email.isEmpty()) {
			filter += QString(" AND email LIKE '%%1%'").arg(email);
		}
		if (gender) {  // 1男 2女 3保密
			filter += QString(" AND gender=%1").arg(gender);
		}

		if (isEnable) { // 1启用 2禁用
			filter += QString(" and isEnable=%1 ").arg(isEnable);
		}
		SSqlConnectionWrap wrap;
		QSqlQuery query(wrap.openConnection());
		//查询总记录条数
		query.exec(QString("SELECT COUNT(*) total FROM user_info %1 ").arg(filter));
#if _DEBUG
		qDebug() << "---------------查询总记录数";
		qDebug() << query.lastQuery();
#endif
		query.next();
		int total_records = query.record().value("total").toInt();

		if (pageSize == 0) {
			pageSize = 20;//默认每页20条数据
		}

		auto last_page = total_records / pageSize + (total_records % pageSize ? 1 : 0);
		if (page > last_page || page < 1) {
			page = 1;  // 超出范围，返回第一页
		}

		QString sql = "SELECT * FROM user_info ";
		sql += filter;
		sql += QString(" LIMIT %1,%2;").arg((page - 1) * pageSize).arg(pageSize);
		query.exec(sql);
#if _DEBUG
		qDebug() << "查询用户信息";
		qDebug() << query.lastQuery() << '\n';
#endif
		//CheckSqlQuery(query);

		QJsonObject jobj;
		QJsonArray array;
		//将查询结果转换为json数组
		while (query.next()) {
			array.append(recordToJson(query.record()));
		}
		jobj.insert("list", array);
		jobj.insert("cur_page", page);
		jobj.insert("page_size", pageSize);
		jobj.insert("last_page", last_page);
		jobj.insert("total_records", total_records);


		resSuccess(SResult::success(jobj), responder);
		return;
		});

	//用户创建
	m_server.route("/user/create", QHttpServerRequest::Method::Post, 
		[](const QHttpServerRequest& request, QHttpServerResponder&& responder) {
		CheckJsonParse(request,responder);

		//校验参数
		std::optional<QByteArray> token = CheckToken(request);
		if (token.has_value()) { //token校验失败
			resError(token.value(), responder);
			return;
		}

		//检查参数完整性
		auto rObj = jdom.object();
		if (!rObj.contains("user_account") ||
			!rObj.contains("user_name")) {
			resError(SResult::error(SResultCode::ParamMissing), responder);
			return ;
		}
		auto password = rObj.value("password").toString();
		if (password.isEmpty()) {
			password = "123456"; //默认密码
		}

		SSqlConnectionWrap wrap;
		QSqlQuery query(wrap.openConnection());
		QString sql = QString("INSERT IGNORE INTO user_info (user_account,password,user_name,gender,mobile,email) VALUES('%1','%2','%3',%4,'%5','%6')")
			.arg(jdom["user_account"].toString())
			.arg(password)
			.arg(jdom["user_name"].toString())
			.arg(jdom["gender"].toInt())
			.arg(jdom["mobile"].toString())
			.arg(jdom["email"].toString());
		query.exec(sql);
#if _DEBUG
		qDebug() << "用户创建";
		qDebug() << query.lastQuery() << '\n';
#endif
		CheckSqlQuery(query,responder);

		//检查是否插入成功
		if (query.numRowsAffected() == 0) {
			resError(SResult::error(SResultCode::UserAlreadyExists), responder);
			return;
		}

		resSuccess(SResult::success(), responder);
		return;
		});

	//用户删除
	m_server.route("/user/<arg>", QHttpServerRequest::Method::Delete,
		[](const QString& id, const QHttpServerRequest& request, QHttpServerResponder&& responder) {
		//校验参数
		std::optional<QByteArray> token = CheckToken(request);
		if (token.has_value()) { //token校验失败
			resError(token.value(), responder);
			return;
		}
		
		CheckIsInt(id,responder);

		SSqlConnectionWrap wrap;
		QSqlQuery query(wrap.openConnection());
		query.prepare(QString("UPDATE user_info SET isDeleted=true WHERE id=%1").arg(u_id));
		query.exec();
#if _DEBUG
		qDebug() << "用户删除";
		qDebug() << query.lastQuery() << '\n';
#endif
		CheckSqlQuery(query, responder);

		//检查是否更新成功
		if (query.numRowsAffected() == 0) {
			resError(SResult::error(SResultCode::UserNotFound), responder);
			return;
		}

		resSuccess(SResult::success(), responder);
		return;
		});

	//批量用户删除
	m_server.route("/users", QHttpServerRequest::Method::Delete,
		[](const QHttpServerRequest& request, QHttpServerResponder&& responder) {
			CheckJsonParse(request,responder);

			// 校验Token
			std::optional<QByteArray> token = CheckToken(request);
			if (token.has_value()) { // Token校验失败
				resError(token.value(), responder);
				return;
			}

			// 获取JSON中的ID列表
			auto ids = jdom["lists"].toArray();  // 注意字段名改为"lists"
			qDebug() << ids;
			if (ids.isEmpty()) {
				resError(SResult::error(SResultCode::ParamInvalid, "ID列表不能为空"), responder);
				return;
			}

			SSqlConnectionWrap wrap;
			QSqlQuery query(wrap.openConnection());

			QStringList placeholders;
			for (int i = 0; i < ids.size(); ++i) {
				placeholders.append("?");
			}
			QString sql = QString("UPDATE user_info SET isDeleted=true WHERE id IN (%1)").arg(placeholders.join(","));

			query.prepare(sql);

			for (const auto& idVal : ids) {
				bool ok;
				int id = idVal.toVariant().toInt(&ok);
				if (!ok) {
					resError(SResult::error(SResultCode::ParamInvalid, QString("无效ID: %1").arg(idVal.toString())), responder);
					return;
				}
				query.addBindValue(id); // 绑定整数类型
			}

			if (!query.exec()) {
				// 处理SQL错误
				CheckSqlQuery(query, responder);
			}

#if _DEBUG
			qDebug() << "批量用户删除";
			qDebug() << query.lastQuery() << '\n';
			qDebug() << "Bound values:" << query.boundValues(); 
#endif

			if (query.numRowsAffected() == 0) {
				resError(SResult::error(SResultCode::UserNotFound), responder);
				return;
			}

			resSuccess(SResult::success(), responder);
			return;
		});

	//用户修改
	m_server.route("/user/<arg>", QHttpServerRequest::Method::Patch,
		[](const QString& id, const QHttpServerRequest& request, QHttpServerResponder&& responder) {
		CheckJsonParse(request, responder);

		//校验参数
		std::optional<QByteArray> token = CheckToken(request);
		if (token.has_value()) { //token校验失败
			resError(token.value(), responder);
			return;
		}

		CheckIsInt(id,responder);

		auto rObj = jdom.object();
		QString sql = "UPDATE user_info SET ";
		if (rObj.contains("user_name")) {
			sql += QString("user_name='%1',").arg(rObj["user_name"].toString());
		}
		if (rObj.contains("password")) {
			sql += QString("password='%1',").arg(rObj["password"].toString());
		}
		if (rObj.contains("gender")) {
			sql += QString("gender=%1,").arg(rObj["gender"].toInt());
		}
		if (rObj.contains("mobile")) {
			sql += QString("mobile='%1',").arg(rObj["mobile"].toString());
		}
		if (rObj.contains("email")) {
			sql += QString("email='%1',").arg(rObj["email"].toString());
		}
		if (rObj.contains("isEnable")) {
			sql += QString("isEnable=%1,").arg(rObj["isEnable"].toInt());
		}

		sql.chop(1); //去掉最后一个逗号

		SSqlConnectionWrap wrap;
		QSqlQuery query(wrap.openConnection());
		query.prepare(QString(sql + " WHERE id=%1").arg(u_id));
		query.exec();
#if _DEBUG
		qDebug() << "用户修改";
		qDebug() << query.lastQuery();
#endif
		CheckSqlQuery(query, responder);

		//检查是否更新成功
		if (query.numRowsAffected() == 0) {
			resSuccess(SResult::success(SResultCode::SuccessButNoData), responder);
			return;
		}

		resSuccess(SResult::success(), responder);
		return;
		});

	//用户头像上传: POST
	m_server.route("/user/<arg>/avatar", QHttpServerRequest::Method::Post,
		[](const QString& id, const QHttpServerRequest& request, QHttpServerResponder&& responder) {
		//校验参数
		std::optional<QByteArray> token = CheckToken(request);
		if (token.has_value()) { //token校验失败
			resError(token.value(), responder);
			return;
		}
		CheckIsInt(id,responder);

		auto data = request.body();
		if (data.isEmpty()) {
			resError(SResult::error(SResultCode::ParamMissing), responder);
			return;
		}
		auto parse = SHttpPartParse(data);

		if (!parse.parse()) {
			resError(SResult::error(SResultCode::ParamInvalid), responder);
			return;
		}
		auto path = QString("/public/images/avatar/");
		QDir dir;
		if (!dir.exists("." + path)) {
			dir.mkpath("." + path);
		}

		//首先查找原来的头像文件
		QString old_path;
		SSqlConnectionWrap wrap;
		QSqlQuery query(wrap.openConnection());
		query.prepare(QString("SELECT avatar_path FROM user_info WHERE id=%1").arg(u_id));
		query.exec();
		CheckSqlQuery(query,responder);

		if (query.next()) {
			old_path = query.record().value("avatar_path").toString();
			QFile::remove(QString("." + old_path));//删除原头像
		}
		//没有则不用删除

		auto file_path = path + id + "." + QFileInfo(parse.filename()).suffix();
		QFile file(QString("." + file_path));
		if (!file.open(QIODevice::WriteOnly)) {
			resError(SResult::error(SResultCode::ServerFileError), responder);
			return;
		}
		file.write(parse.data());
		//把路径写入数据库
		query.prepare(QString("UPDATE user_info SET avatar_path='%1' WHERE id=%2").arg(file_path).arg(u_id));
		query.exec();
#if _DEBUG
		qDebug() << "用户头像上传";
		qDebug() << query.lastQuery();
#endif
		CheckSqlQuery(query,responder);

		QJsonObject jObj;
		jObj.insert("url", file_path);

		resSuccess(SResult::success(jObj), responder);
		return;
		});

	//用户头像获取: GET
	m_server.route("/public/images/avatar/<arg>", QHttpServerRequest::Method::Get,
		[](const QString& image_name, const QHttpServerRequest& request, QHttpServerResponder&& responder) {

		//校验参数
		std::optional<QByteArray> token = CheckToken(request);
		if (token.has_value()) { //token校验失败
			resError(token.value(), responder)
			return;
		}
		
		auto path = "/public/images/avatar/" + image_name;
		QFile file("." + path);
		if (!file.open(QIODevice::ReadOnly)) {
			resError(SResult::error(SResultCode::ServerFileError, "头像未找到"), responder);
			return;
		}

		SHttpResponseBuilder(file.readAll())
			.addCORS()
			.addHeader("Content-Type", QString("image/%1").arg(QFileInfo(file.fileName()).suffix()).toUtf8())
			.addHeader("Content-Length", QByteArray::number(file.size()))
			.addHeader("Content-Disposition", "inline;  filename=" + file.fileName().toUtf8())
			.send(responder);
		return;
		});
}

void Server::route_imageManagement()
{
	//用户图片获取：获取某个用户上传的全部图片
	m_server.route("/image/list/<arg>", QHttpServerRequest::Method::Post,
		[](const QString& id,const QHttpServerRequest& request, QHttpServerResponder&& responder) {
		CheckJsonParse(request, responder);

		//校验参数
		std::optional<QByteArray> token = CheckToken(request);
		if (token.has_value()) { //token校验失败
			resError(token.value(), responder);
			return;
		}
		CheckIsInt(id,responder);

		auto page = jdom["page"].toInt();
		auto pageSize = jdom["pageSize"].toInt();
		auto image_name = jdom["image_name"].toString();
		auto image_type = jdom["image_type"].toString();
		auto image_format = jdom["image_format"].toString();
		auto image_share = jdom["image_share"].toVariant().toInt();
		auto image_download = jdom["image_download"].toVariant().toInt();
		QString filter = "";
		if (!image_name.isEmpty()) {
			filter += QString(" AND image_name LIKE '%%1%'").arg(image_name);
		}
		if (!image_type.isEmpty()) {
			filter += QString(" AND image_type LIKE '%%1%'").arg(image_type);
		}
		if (!image_format.isEmpty()) {
			filter += QString(" AND image_format LIKE '%%1%'").arg(image_format);
		}
		if (image_share) {
			//'图片共享方式（1 共有，2 私有，3授权 ...）',
			filter += QString(" AND image_share=%1").arg(image_share);
		}
		if (image_download) {
			//'图片是否允许下载 1是，2 否，3授权',
			filter += QString(" AND image_download=%1").arg(image_download);
		}

		if (pageSize == 0) {
			pageSize = 6;
		}

		//确保筛选后能得到正确的页数信息
		SSqlConnectionWrap wrap;
		QSqlQuery query(wrap.openConnection());
		query.prepare(QString("SELECT COUNT(*) as total FROM user_image where isDeleted=0 AND owner_id=%1 %2").arg(u_id).arg(filter));
		if (!query.exec()) {
			resError(SResult::error(SResultCode::ServerSqlQueryError), responder);
			return;
		}
#if _DEBUG	
		qDebug() << "指定用户图片列表获取";
		qDebug() << query.lastQuery();
#endif

		query.next();
		auto total_records = query.value("total").toInt(); //图片总数
		auto last_page = total_records / pageSize + (total_records % pageSize ? 1 : 0);
		if (page < 1 || page > last_page) {
			page = 1;
		}

		//图片列表获取
		QString sql = QString("SELECT * FROM user_image WHERE isDeleted=0 AND owner_id=%1 %2").arg(u_id).arg(filter);
		sql += QString(" LIMIT %1,%2").arg((page - 1) * pageSize).arg(pageSize);
		query.prepare(sql);
		if (!query.exec()) {
			resError(SResult::error(SResultCode::ServerSqlQueryError), responder);
			return;
		}
#if _DEBUG	
		qDebug() << query.lastQuery();
#endif

		QJsonArray jarray;
		int i = 0;
		while (query.next()) {
			auto id = query.value("id").toInt(); //获取每张图片id
			QJsonObject jobj;
			jobj.insert("id", id);
			jobj.insert("owner_id", query.value("owner_id").toInt());
			jobj.insert("image_path", query.value("image_path").toString());
			jobj.insert("image_name", query.value("image_name").toString());
			jobj.insert("image_size", query.value("image_size").toInt());
			jobj.insert("image_format", query.value("image_format").toString());
			jobj.insert("image_share", query.value("image_share").toInt());
			jobj.insert("image_type", query.value("image_type").toString());
			jobj.insert("image_download", query.value("image_download").toInt());
			jobj.insert("image_ResolutionRatio", query.value("image_ResolutionRatio").toString());
			jobj.insert("upload_time", query.value("upload_time").toString());
			jobj.insert("description", query.value("description").toString());
			jarray.append(jobj);
		}

		if (jarray.isEmpty()) {
			resSuccess(SResult::success(SResultCode::SuccessButNoData), responder);
			return;
		}

		QJsonObject jobj;
		jobj.insert("images", jarray);
		jobj.insert("cur_page", page);
		jobj.insert("page_size", pageSize);
		jobj.insert("last_page", last_page);
		jobj.insert("total_records", total_records);
		resSuccess(SResult::success(jobj), responder);
		return;
		});


	//用户图片上传: POST
	m_server.route("/image/upload/<arg>", QHttpServerRequest::Method::Post, 
		[](const QString& owner_id,const QHttpServerRequest& request, QHttpServerResponder&& responder) {

		//校验参数
		std::optional<QByteArray> token = CheckToken(request);
		if (token.has_value()) { //token校验失败
			resError(token.value(), responder);
			return;
		}
		CheckIsInt(owner_id,responder);
		

		auto uquery = request.query();
		auto description = uquery.queryItemValue("description");
		if (description.isEmpty()) {
			description = "";
		}
		auto image_type = uquery.queryItemValue("image_type");
		if (image_type.isEmpty()) {
			image_type = "默认";
		}
		auto image_share = uquery.queryItemValue("image_share").toInt();
		auto image_download = uquery.queryItemValue("image_download").toInt();

		//解析图片数据
		auto data = request.body();
		if (data.isEmpty()) {
			resError(SResult::error(SResultCode::ParamMissing),responder);
			return;
		}
		auto parse = SHttpPartParse(data);
		if (!parse.parse()) {
			resError(SResult::error(SResultCode::ParamInvalid), responder);
			return;
		}
		auto path = QString("/public/images/upload/%1/").arg(u_id);
		QDir dir;
		if (!dir.exists("." + path)) {
			dir.mkpath("." + path);
		}
		auto a = parse.filename();
		//把路径写入数据库
		SSqlConnectionWrap wrap;
		QSqlQuery query(wrap.openConnection());
		query.prepare(QString("INSERT IGNORE INTO user_image(owner_id,image_name,image_type,upload_time,description,image_format,image_share,image_download) \
		VALUES (%1,'%2','%3','%4','%5','%6',%7,%8)")
			.arg(u_id)
			.arg(QFileInfo(parse.filename()).baseName())
			.arg(image_type)
			.arg(QDateTime::currentDateTime().toString("yyyy-MM-dd HH:mm:ss"))
			.arg(description)
			.arg(QFileInfo(parse.filename()).suffix())
			.arg(image_share)
			.arg(image_download)
			
		);
		query.exec();
#if _DEBUG
		qDebug() << "用户图片上传";
		qDebug() << query.lastQuery();
#endif
		CheckSqlQuery(query,responder);

		//检查是否插入成功
		if (query.numRowsAffected() == 0) {
			resError(SResult::error(SResultCode::ServerSqlQueryError), responder);
			return;
		}

		auto id = query.lastInsertId().toInt();
		//图片路径格式：/public/images/upload/owner_id/id.后缀名
		auto file_path = QString(path + QString::number(id) + "." + QFileInfo(parse.filename()).suffix());
		QFile file("." + file_path);
		if (!file.open(QIODevice::WriteOnly)) {
			resError(SResult::error(SResultCode::ServerFileError), responder);
			return;
		}
		file.write(parse.data());  //保存到文件
		QImage img = QImage("." + file_path);

		//image_path   image_size
		query.prepare(QString("UPDATE user_image SET image_path='%1',image_size=%2,image_ResolutionRatio='%3' WHERE id=%4")
			.arg(file_path)
			.arg(file.size())
			.arg(QString::number(img.width()) + " x " + QString::number(img.height()))
			.arg(id)
		);
		if (!query.exec()) {
			resError(SResult::error(SResultCode::ServerSqlQueryError), responder);
			return;
		}
#if _DEBUG
		qDebug() << query.lastQuery();
#endif

		resSuccess(SResult::success(), responder);
		return;
		});

	//用户图片获取: GET
	m_server.route("/public/images/upload/<arg>/<arg>", QHttpServerRequest::Method::Get,
		[](const QString& owner_id, const QString& image_name, const QHttpServerRequest& request, QHttpServerResponder&& responder) {

			//校验参数
			//std::optional<QByteArray> token = CheckToken(request);
			//if (token.has_value()) { //token校验失败
			//	resError(token.value(), responder)
			//		return;
			//}

			auto path = "/public/images/upload/" + owner_id + "/" + image_name;
			QFile file("." + path);
			if (!file.open(QIODevice::ReadOnly)) {
				resError(SResult::error(SResultCode::ServerFileError, "头像未找到"), responder);
				return;
			}

			SHttpResponseBuilder(file.readAll())
				.addCORS()
				.addHeader("Content-Type", QString("image/%1").arg(QFileInfo(file.fileName()).suffix()).toUtf8())
				.addHeader("Content-Length", QByteArray::number(file.size()))
				.addHeader("Content-Disposition", "inline;  filename=" + file.fileName().toUtf8())
				.send(responder);
			return;
		});

	//图片删除
	m_server.route("/image/<arg>", QHttpServerRequest::Method::Delete,
		[](const QString& id, const QHttpServerRequest& request, QHttpServerResponder&& responder) {
			//校验参数
			std::optional<QByteArray> token = CheckToken(request);
			if (token.has_value()) { //token校验失败
				resError(token.value(), responder);
				return;
			}

			CheckIsInt(id, responder);

			SSqlConnectionWrap wrap;
			QSqlQuery query(wrap.openConnection());
			query.prepare(QString("UPDATE user_image SET isDeleted=true WHERE id=%1").arg(u_id));
			query.exec();
#if _DEBUG
			qDebug() << "图片删除";
			qDebug() << query.lastQuery() << '\n';
#endif
			CheckSqlQuery(query, responder);

			//检查是否更新成功
			if (query.numRowsAffected() == 0) {
				resError(SResult::error(SResultCode::ImageNotFound), responder);
				return;
			}

			resSuccess(SResult::success(), responder);
			return;
		});

	//批量图片删除
	m_server.route("/images", QHttpServerRequest::Method::Delete,
		[](const QHttpServerRequest& request, QHttpServerResponder&& responder) {
			CheckJsonParse(request, responder);

			// 校验Token
			std::optional<QByteArray> token = CheckToken(request);
			if (token.has_value()) { // Token校验失败
				resError(token.value(), responder);
				return;
			}

			// 获取JSON中的ID列表
			auto ids = jdom["lists"].toArray();  // 注意字段名改为"lists"
			if (ids.isEmpty()) {
				resError(SResult::error(SResultCode::ParamInvalid, "图片ID列表不能为空"), responder);
				return;
			}

			SSqlConnectionWrap wrap;
			QSqlQuery query(wrap.openConnection());

			QStringList placeholders;
			for (int i = 0; i < ids.size(); ++i) {
				placeholders.append("?");
			}
			QString sql = QString("UPDATE user_image SET isDeleted=true WHERE id IN (%1)").arg(placeholders.join(","));

			query.prepare(sql);

			for (const auto& idVal : ids) {
				bool ok;
				int id = idVal.toVariant().toInt(&ok);
				if (!ok) {
					resError(SResult::error(SResultCode::ParamInvalid, QString("无效ID: %1").arg(idVal.toString())), responder);
					return;
				}
				query.addBindValue(id); // 绑定整数类型
			}

			if (!query.exec()) {
				// 处理SQL错误
				CheckSqlQuery(query, responder);
			}

#if _DEBUG
			qDebug() << "批量图片删除";
			qDebug() << query.lastQuery() << '\n';
			qDebug() << "Bound values:" << query.boundValues();
#endif

			if (query.numRowsAffected() == 0) {
				resError(SResult::error(SResultCode::ImageNotFound), responder);
				return;
			}

			resSuccess(SResult::success(), responder);
			return;
		});
}

void Server::route_advancedQuery() {

	//检查某个用户账号是否与数据库中重复
	m_server.route("/check/account/<arg>", QHttpServerRequest::Method::Get,
		[](const QString& user_account, const QHttpServerRequest& request, QHttpServerResponder&& responder) {
			// 校验Token
			std::optional<QByteArray> token = CheckToken(request);
			if (token.has_value()) {
				resError(token.value(), responder);
				return;
			}

			SSqlConnectionWrap wrap;
			QSqlQuery query(wrap.openConnection());
			query.prepare(QString("SELECT * FROM user_info WHERE user_account='%1'").arg(user_account));
			query.exec();
#if _DEBUG
			qDebug() << "检查用户账号是否重复";
			qDebug() << query.lastQuery() << '\n';
#endif
			CheckSqlQuery(query, responder);

			// 查询到数据
			if (query.next()) {
				resError(SResult::error(SResultCode::AccountAleadyExists), responder);
				return;
			}

			resSuccess(SResult::success(), responder);
			return;

		});

	
	//获取目录树：GET
	m_server.route("/role/<arg>/menu", QHttpServerRequest::Method::Get,
		[](const QString& user_id, const QHttpServerRequest& request, QHttpServerResponder&& responder) {
			// 校验Token
			std::optional<QByteArray> token = CheckToken(request);
			if (token.has_value()) {
				resError(token.value(), responder);
				return;
			}

			CheckIsInt(user_id,responder);

			// 根据userId生成菜单
			QJsonArray array = createMenuJson(u_id); // 假设已调整该函数接收userId

			resSuccess(SResult::success_menu(array), responder);
			return;
		});

}
