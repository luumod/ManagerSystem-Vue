#ifndef SERVER_H
#define SERVER_H

#include <QHttpServer>

class Server {
public:
	Server();



private:
	QHttpServer m_server;

	/**
	* 用户登录管理
	* 登录，注册
	*/
	void route_userLogin();

	/**
	* 用户管理:
	* 创建用户，删除用户，修改用户，查询用户
	*/
	void route_managerUserSystem();

	/**
	* 高级查询：
	* 菜单管理
	*/
	void route_advancedQuery();
};

#endif //SERVER_H