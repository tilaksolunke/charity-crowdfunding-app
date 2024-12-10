"use client";
import React from "react";
import { ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#164863",
            borderRadius: 2,
          },
          components: {
            Button: {
              controlHeight: 40,
              boxShadow: "none",
              colorPrimaryActive: "#164863",
              controlOutline: "none",
              colorBorder: "#164863",
            },
            Input:{
                controlHeight:40,
                activeBorderColor:"#164863",
                hoverBorderColor:"#164863",
                activeShadow:'none',
            },
            Select:{
                controlHeight:40,
                controlOutline:'none',
            }
          },
        }}
      >
        {children}
      </ConfigProvider>
    </div>
  );
}

export default ThemeProvider;
