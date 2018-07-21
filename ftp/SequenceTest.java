import static org.junit.Assert.assertEquals;

import org.junit.Test;

import components.sequence.Sequence;

/**
 * JUnit test fixture for {@code Sequence<String>}'s constructor and kernel
 * methods.
 *
 * @author Johan McGWire
 *
 */
public abstract class SequenceTest {

    /**
     * Invokes the appropriate {@code Sequence} constructor for the
     * implementation under test and returns the result.
     *
     * @return the new sequence
     * @ensures constructorTest = <>
     */
    protected abstract Sequence<String> constructorTest();

    /**
     * Invokes the appropriate {@code Sequence} constructor for the reference
     * implementation and returns the result.
     *
     * @return the new sequence
     * @ensures constructorRef = <>
     */
    protected abstract Sequence<String> constructorRef();

    /**
     *
     * Creates and returns a {@code Sequence<String>} of the implementation
     * under test type with the given entries.
     *
     * @param args
     *            the entries for the sequence
     * @return the constructed sequence
     * @ensures createFromArgsTest = [entries in args]
     */
    private Sequence<String> createFromArgsTest(String... args) {
        Sequence<String> sequence = this.constructorTest();
        for (String s : args) {
            sequence.add(sequence.length(), s);
        }
        return sequence;
    }

    /**
     *
     * Creates and returns a {@code Sequence<String>} of the reference
     * implementation type with the given entries.
     *
     * @param args
     *            the entries for the sequence
     * @return the constructed sequence
     * @ensures createFromArgsRef = [entries in args]
     */
    private Sequence<String> createFromArgsRef(String... args) {
        Sequence<String> sequence = this.constructorRef();
        for (String s : args) {
            sequence.add(sequence.length(), s);
        }
        return sequence;
    }

    @Test
    public final void testAddFromEmpty() {
        /*
         * Set up variables and call method under test
         */
        Sequence<String> q = this.constructorTest();
        Sequence<String> qExpected = this.createFromArgsRef("Red");
        /*
         * Call method under test
         */
        q.add(0, "red");
        /*
         * Assert that values of variables match expectations
         */
        assertEquals(qExpected, q);
    }

    @Test
    public final void testAddTopFromNonEmpty() {
        /*
         * Set up variables and call method under test
         */
        Sequence<String> q = this.createFromArgsTest("Red");
        Sequence<String> qExpected = this.createFromArgsRef("Blue", "Red");
        /*
         * Call method under test
         */
        q.add(0, "blue");
        /*
         * Assert that values of variables match expectations
         */
        assertEquals(qExpected, q);
    }

    @Test
    public final void testAddBotFromNonEmpty() {
        /*
         * Set up variables and call method under test
         */
        Sequence<String> q = this.createFromArgsTest("Blue");
        Sequence<String> qExpected = this.createFromArgsRef("Blue", "Red");
        /*
         * Call method under test
         */
        q.add(1, "Red");
        /*
         * Assert that values of variables match expectations
         */
        assertEquals(qExpected, q);
    }

    @Test
    public final void testAddMidFromNonEmpty() {
        /*
         * Set up variables and call method under test
         */
        Sequence<String> q = this.createFromArgsTest("Blue", "Red");
        Sequence<String> qExpected = this.createFromArgsRef("Blue", "Purple",
                "Red");
        /*
         * Call method under test
         */
        q.add(1, "Purple");
        /*
         * Assert that values of variables match expectations
         */
        assertEquals(qExpected, q);
    }

    @Test
    public final void testRemoveTopFromNonEmpty() {
        /*
         * Set up variables and call method under test
         */
        Sequence<String> q = this.createFromArgsTest("Blue", "Red");
        Sequence<String> qExpected = this.createFromArgsRef("Red");
        /*
         * Call method under test
         */
        q.remove(0);
        /*
         * Assert that values of variables match expectations
         */
        assertEquals(qExpected, q);
    }

    @Test
    public final void testRemoveBotFromNonEmpty() {
        /*
         * Set up variables and call method under test
         */
        Sequence<String> q = this.createFromArgsTest("Blue", "Red");
        Sequence<String> qExpected = this.createFromArgsRef("Blue");
        /*
         * Call method under test
         */
        q.remove(1);
        /*
         * Assert that values of variables match expectations
         */
        assertEquals(qExpected, q);
    }

    @Test
    public final void testRemoveMidFromNonEmpty() {
        /*
         * Set up variables and call method under test
         */
        Sequence<String> q = this.createFromArgsTest("Blue", "Purple", "Red");
        Sequence<String> qExpected = this.createFromArgsRef("Blue", "Red");
        /*
         * Call method under test
         */
        q.remove(1);
        /*
         * Assert that values of variables match expectations
         */
        assertEquals(qExpected, q);
    }

    @Test
    public final void testLengthEmpty() {
        /*
         * Set up variables and call method under test
         */
        Sequence<String> q = this.createFromArgsTest();
        Sequence<String> qExpected = this.createFromArgsRef();
        /*
         * Call method under test
         */
        int testLength = q.length();
        /*
         * Assert that values of variables match expectations
         */
        assertEquals(0, testLength);
        assertEquals(qExpected, q);
    }

    @Test
    public final void testLengthNonEmpty() {
        /*
         * Set up variables and call method under test
         */
        Sequence<String> q = this.createFromArgsTest("Blue", "Red");
        Sequence<String> qExpected = this.createFromArgsRef("Blue", "Red");
        /*
         * Call method under test
         */
        int testLength = q.length();
        /*
         * Assert that values of variables match expectations
         */
        assertEquals(2, testLength);
        assertEquals(qExpected, q);
    }
}