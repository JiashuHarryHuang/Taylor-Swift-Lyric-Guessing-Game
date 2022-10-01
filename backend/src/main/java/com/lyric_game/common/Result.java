package com.lyric_game.common;

import lombok.Data;

import java.io.Serializable;

/**
 * The uniform format for data transport
 * @param <T>
 */
@Data
public class Result<T> implements Serializable {

    /**
     * code: 1 = success, otherwise = failure
     */
    private Integer code;

    /**
     * Error message
     */
    private String msg;

    /**
     * Data
     */
    private T data;

    /**
     * Return a Result object with data inside and code of 1
     * @param object Data that needs to be transported
     * @return a Result object with data inside
     * @param <T> Type of data
     */
    public static <T> Result<T> success(T object) {
        Result<T> r = new Result<T>();
        r.data = object;
        r.code = 1;
        return r;
    }

    /**
     * Return a Result object with error message inside and code of 0
     * @param msg Error message
     * @return a Result object with error message inside
     * @param <T> Type of data
     */
    public static <T> Result<T> error(String msg) {
        Result r = new Result();
        r.msg = msg;
        r.code = 0;
        return r;
    }

}
