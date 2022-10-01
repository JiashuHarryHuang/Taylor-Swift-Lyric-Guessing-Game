package com.lyric_game.controller;

import com.lyric_game.common.Result;
import com.lyric_game.pojo.Lyric;
import com.lyric_game.util.CSVParsingUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller class that connects and responds to frontend requests
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Slf4j
public class LyricController {
    @Autowired
    private CSVParsingUtils csvParsingUtils;

    /**
     * Return the total number of lyrics in the CSV
     * @return total number of lyrics in the CSV file
     */
    @GetMapping
    public Result<Integer> getTotalLines() {
        return Result.success(csvParsingUtils.getLyricList().size());
    }

    /**
     * Return the Lyric object in lyricList with the given index
     * @param index The index number that fronend sends
     * @return Lyric object in lyricList with the given index
     */
    @GetMapping("/{index}")
    public Result<Lyric> getLyricByIndex(@PathVariable int index) {
        return Result.success(csvParsingUtils.getLyricList().get(index));
    }
}