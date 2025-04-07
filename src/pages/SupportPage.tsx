import React from "react";
import { useTranslation } from "react-i18next";

const SupportPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-green-600 mb-6">
            {t("support.title", "Hỗ trợ")}
          </h1>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-semibold mb-4">
              {t("support.contactUs", "Liên hệ chúng tôi")}
            </h2>

            <p className="text-gray-700 mb-6">
              {t(
                "support.description",
                "Nếu bạn cần hỗ trợ hoặc có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua các kênh sau:",
              )}
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">support@oghepvinhomes.vn</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Hotline</h3>
                  <p className="text-gray-600">0123 456 789</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Địa chỉ</h3>
                  <p className="text-gray-600">
                    Vinhomes Grand Park, Quận 9, TP.HCM
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-4">
                {t("support.faq", "Câu hỏi thường gặp")}
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-600">
                    {t(
                      "support.faq1.question",
                      "Làm thế nào để đăng ký tài khoản?",
                    )}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {t(
                      "support.faq1.answer",
                      "Bạn có thể đăng ký tài khoản bằng cách nhấp vào nút Đăng nhập ở góc trên bên phải và làm theo hướng dẫn.",
                    )}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-green-600">
                    {t(
                      "support.faq2.question",
                      "Làm thế nào để đăng tin cho thuê phòng?",
                    )}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {t(
                      "support.faq2.answer",
                      "Sau khi đăng nhập, bạn có thể nhấp vào mục Đăng phòng trên thanh điều hướng và điền thông tin chi tiết về phòng của bạn.",
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupportPage;
