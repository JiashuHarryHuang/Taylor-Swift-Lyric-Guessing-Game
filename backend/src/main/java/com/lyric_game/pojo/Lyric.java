package com.lyric_game.pojo;

import com.opencsv.bean.CsvBindByName;
import lombok.Data;

/**
 * Pojo class of lyric that maps to the csv columns
 */
@Data
public class Lyric {
    @CsvBindByName
    private String artist;

    @CsvBindByName
    private String album;

    @CsvBindByName(column = "track_title") //Specify how to map the names of csv columns to the fields
    private String trackTitle;

    @CsvBindByName(column = "track_n")
    private int trackN;

    @CsvBindByName
    private String lyric;

    @CsvBindByName
    private int line;

    @CsvBindByName
    private int year;
}
