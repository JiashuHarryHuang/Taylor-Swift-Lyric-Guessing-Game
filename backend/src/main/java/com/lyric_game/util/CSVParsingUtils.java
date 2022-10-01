package com.lyric_game.util;

import com.lyric_game.pojo.Lyric;
import com.opencsv.bean.CsvToBeanBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.*;
import java.util.List;

/**
 * Util class that parses CSV when the server started
 */
@Slf4j
@Component
public class CSVParsingUtils {
    /**
     * Used to hold all the data in CSV file
     */
    private List<Lyric> lyricList;

    /**
     * Path to where the csv is stored
     */
    @Value("${coding-challenge.path.lyrics}")
    private String lyricPath;

    /**
     * Right after the server started, load the CSV file into a List.
     */
    @PostConstruct
    public void loadCSV() {
        try {
            lyricList = new CsvToBeanBuilder(new FileReader(lyricPath))
                    .withType(Lyric.class)
                    .build()
                    .parse();
        } catch (FileNotFoundException e) {
            log.error(e.getMessage());
        }
    }

    /**
     * Getter for lyricList
     * @return lyricList
     */
    public List<Lyric> getLyricList() {
        return lyricList;
    }
}
