#include <QHttpServerResponse>
#include <QJsonObject>
#include <QMap>
#include <QByteArray>

class SHttpResponseBuilder {
public:
	explicit SHttpResponseBuilder(QHttpServerResponder::StatusCode statusCode)
		: responseData(QByteArray()), statusCode(statusCode) {
	}

	explicit SHttpResponseBuilder(const QByteArray& data,
		QHttpServerResponder::StatusCode statusCode = QHttpServerResponder::StatusCode::Ok)
		: responseData(data), statusCode(statusCode) {
	}

	// 设置状态码，支持链式调用
	SHttpResponseBuilder& setStatusCode(QHttpServerResponder::StatusCode code) {
		statusCode = code;
		return *this;
	}

	// 添加单个HTTP头，支持链式调用
	SHttpResponseBuilder& addHeader(const QByteArray& key, const QByteArray& value) {
		headers[key] = value;
		return *this;
	}

	SHttpResponseBuilder& addCORS() {
		headers["Access-Control-Allow-Credentials"] = "true";
		headers["Access-Control-Allow-Origin"] = "*";
		headers["Access-Control-Allow-Methods"] = "*";
		headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
		return *this;
	}

	// 构建最终的QHttpServerResponse对象
	QHttpServerResponse build() const {
		QHttpServerResponse response(responseData, statusCode);
		for (auto it = headers.constBegin(); it != headers.constEnd(); ++it) {
			response.setHeader(it.key(), it.value());
		}
		return response;
	}

	// 直接发送响应（最终使用方式）
	void send(QHttpServerResponder& responder) const {
		responder.sendResponse(build());
	}

private:
	QByteArray responseData;
	QHttpServerResponder::StatusCode statusCode;
	QMap<QByteArray, QByteArray> headers;
};

/* 使用示例：
SHttpResponseBuilder(SResult::success(jobj))  // 默认状态码为200
	.setStatusCode(QHttpServerResponder::StatusCode::Created) // 修改状态码
	.addHeader("Access-Control-Allow-Origin", "*")
	.addHeader("Content-Type", "application/json")
	.addHeader("Custom-Header", "Value")
	.send(responder); // 最终发送响应
*/