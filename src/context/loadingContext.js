import { Spin } from "antd";
import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
    const [pageLoading, setPageLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ setPageLoading }}>
            {children}
            {pageLoading && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Lớp mờ che phủ
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                    }}
                >
                    <Spin size="large" tip="Đang tải dữ liệu..." />
                </div>
            )}
        </LoadingContext.Provider>
    );
};

export default LoadingProvider;

export const useLoading = () => useContext(LoadingContext);
