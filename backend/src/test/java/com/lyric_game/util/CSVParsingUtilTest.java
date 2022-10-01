package com.lyric_game.util;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Testing class of CSVParsingUtil
 */
@SpringBootTest
public class CSVParsingUtilTest {

    /**
     * Inject the util object
     */
    @Autowired
    private CSVParsingUtils csvParsingUtils;

    /**
     * Test the two methods
     */
    @Test
    public void testGetList() {
        System.out.println(csvParsingUtils.getLyricList().get(0));
        System.out.println(csvParsingUtils.getLyricList().size());
    }
}
