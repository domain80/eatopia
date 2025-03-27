package com.domain80.wholistika.features.userAccount.utils;

import com.domain80.wholistika.utils.CustomResponse;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

@ControllerAdvice
public class GlobalResponseWrapper implements ResponseBodyAdvice<Object> {

    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
        return !returnType.getDeclaringClass().getName().contains("springfox")
                && !returnType.getMethod().getReturnType().equals(CustomResponse.class);
    }

    @Override
    public Object beforeBodyWrite(Object body,
                                  MethodParameter returnType,
                                  MediaType selectedContentType,
                                  Class<? extends HttpMessageConverter<?>> selectedConverterType,
                                  ServerHttpRequest request,
                                  ServerHttpResponse response) {

        // Retrieve the actual HTTP status code
        int statusCode = HttpStatus.OK.value(); // Default to 200

        if (response instanceof ServletServerHttpResponse) {
            ServletServerHttpResponse servletResponse = (ServletServerHttpResponse) response;
            statusCode = servletResponse.getServletResponse().getStatus();
        }

        // Handle null responses
        if (body == null) {
            return new CustomResponse(HttpStatus.valueOf(statusCode), null);
        }

        // If it's already an ApiResponse, return as is
        if (body instanceof CustomResponse) {
            return body;
        }

        // Wrap successful responses with the status code
        return new CustomResponse(HttpStatus.valueOf(statusCode), body);
    }
}
