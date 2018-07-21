import static org.junit.Assert.assertEquals;

import org.junit.Test;

import components.sequence.Sequence;
import components.sequence.Sequence1L;

/**
 * Sample JUnit test fixture for SequenceSmooth.
 * 
 * @author Johan McGwire
 * 
 * 1. Testing Plan: For the generation of my 4 test cases I wanted to give the smooth method both the smallest inputs for both sequences, alternate 
 * the small and large inputs, and lastly have both of the inputs be large. As well I wanted to make sure the methond can handle the double zero 
 * input of the last test case.
 * 
 * 2. Follows Below
 */
public final class SequenceSmoothTest {

    /**
     * Constructs and returns a sequence of the integers provided as arguments.
     * 
     * @param args
     *            0 or more integer arguments
     * @return the sequence of the given arguments
     * @ensures createFromArgs= [the sequence of integers in args]
     */
    private Sequence<Integer> createFromArgs(Integer... args) {
        Sequence<Integer> s = new Sequence1L<Integer>();
        for (Integer x : args) {
            s.add(s.length(), x);
        }
        return s;
    }

    /**
     * Test smooth with s1 = <2, 4, 6> and s2 = <-5, 12>.
     */
    @Test
    public void test1() {
        /*
         * Set up variables and call method under test
         */
        Sequence<Integer> seq1 = this.createFromArgs(2, 4, 6);
        Sequence<Integer> expectedSeq1 = this.createFromArgs(2, 4, 6);
        Sequence<Integer> seq2 = this.createFromArgs(-5, 12);
        Sequence<Integer> expectedSeq2 = this.createFromArgs(3, 5);
        SequenceSmooth.smooth(seq1, seq2);
        /*
         * Assert that values of variables match expectations
         */
        assertEquals(expectedSeq1, seq1);
        assertEquals(expectedSeq2, seq2);
    }

    /**
     * Test smooth with s1 = <7> and s2 = <13, 17, 11>.
     */
    @Test
    public void test2() {
        /*
         * Set up variables and call method under test
         */
        Sequence<Integer> seq1 = this.createFromArgs(7);
        Sequence<Integer> expectedSeq1 = this.createFromArgs(7);
        Sequence<Integer> seq2 = this.createFromArgs(13, 17, 11);
        Sequence<Integer> expectedSeq2 = this.createFromArgs();
        SequenceSmooth.smooth(seq1, seq2);
        /*
         * Assert that values of variables match expectations
         */
        assertEquals(expectedSeq1, seq1);
        assertEquals(expectedSeq2, seq2);
    }
    
    /**
     * Test smooth with s1 = <0> and s2 = <>.
     */
    @Test
    public void test3() {
        /*
         * Set up variables and call method under test
         */
        Sequence<Integer> seq1 = this.createFromArgs(0);
        Sequence<Integer> expectedSeq1 = this.createFromArgs(0);
        Sequence<Integer> seq2 = this.createFromArgs();
        Sequence<Integer> expectedSeq2 = this.createFromArgs();
        SequenceSmooth.smooth(seq1, seq2);
        /*
         * Assert that values of variables match expectations
         */
        assertEquals(expectedSeq1, seq1);
        assertEquals(expectedSeq2, seq2);
    }
    
    /**
     * Test smooth with s1 = <10, 11> and s2 = <>.
     */
    @Test
    public void test4() {
        /*
         * Set up variables and call method under test
         */
        Sequence<Integer> seq1 = this.createFromArgs(10, 11);
        Sequence<Integer> expectedSeq1 = this.createFromArgs(10, 11);
        Sequence<Integer> seq2 = this.createFromArgs();
        Sequence<Integer> expectedSeq2 = this.createFromArgs(10);
        SequenceSmooth.smooth(seq1, seq2);
        /*
         * Assert that values of variables match expectations
         */
        assertEquals(expectedSeq1, seq1);
        assertEquals(expectedSeq2, seq2);
    }
    
    /**
     * Test smooth with s1 = <10, 11> and s2 = <10, 11>.
     */
    @Test
    public void test5() {
        /*
         * Set up variables and call method under test
         */
        Sequence<Integer> seq1 = this.createFromArgs(10, 11);
        Sequence<Integer> expectedSeq1 = this.createFromArgs(10, 11);
        Sequence<Integer> seq2 = this.createFromArgs(10, 11);
        Sequence<Integer> expectedSeq2 = this.createFromArgs(10);
        SequenceSmooth.smooth(seq1, seq2);
        /*
         * Assert that values of variables match expectations
         */
        assertEquals(expectedSeq1, seq1);
        assertEquals(expectedSeq2, seq2);
    }
    
    /**
     * Test smooth with s1 = <10, 0, 0, 1> and s2 = <>.
     */
    @Test
    public void test6() {
        /*
         * Set up variables and call method under test
         */
        Sequence<Integer> seq1 = this.createFromArgs(10, 0, 0, 1);
        Sequence<Integer> expectedSeq1 = this.createFromArgs(10, 0, 0, 1);
        Sequence<Integer> seq2 = this.createFromArgs(0);
        Sequence<Integer> expectedSeq2 = this.createFromArgs(5, 0, 0, 0);
        SequenceSmooth.smooth(seq1, seq2);
        /*
         * Assert that values of variables match expectations
         */
        assertEquals(expectedSeq1, seq1);
        assertEquals(expectedSeq2, seq2);
    }

}
