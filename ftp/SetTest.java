import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import components.set.Set;

/**
 * JUnit test fixture for {@code Set<String>}'s constructor and kernel methods.
 *
 * @author Put your name here
 *
 */
public abstract class SetTest {

    /**
     * Invokes the appropriate {@code Set} constructor and returns the result.
     *
     * @return the new set
     * @ensures constructorTest = {}
     */
    protected abstract Set<String> constructorTest();

    /**
     * Invokes the appropriate {@code Set} constructor and returns the result.
     *
     * @return the new set
     * @ensures constructorRef = {}
     */
    protected abstract Set<String> constructorRef();

    /**
     * Creates and returns a {@code Set<String>} of the implementation under
     * test type with the given entries.
     *
     * @param args
     *            the entries for the set
     * @return the constructed set
     * @requires [every entry in args is unique]
     * @ensures createFromArgsTest = [entries in args]
     */
    private Set<String> createFromArgsTest(String... args) {
        Set<String> set = this.constructorTest();
        for (String s : args) {
            assert !set.contains(
                    s) : "Violation of: every entry in args is unique";
            set.add(s);
        }
        return set;
    }

    /**
     * Creates and returns a {@code Set<String>} of the reference implementation
     * type with the given entries.
     *
     * @param args
     *            the entries for the set
     * @return the constructed set
     * @requires [every entry in args is unique]
     * @ensures createFromArgsRef = [entries in args]
     */
    private Set<String> createFromArgsRef(String... args) {
        Set<String> set = this.constructorRef();
        for (String s : args) {
            assert !set.contains(
                    s) : "Violation of: every entry in args is unique";
            set.add(s);
        }
        return set;
    }

    @Test
    public final void testAddFromEmpty() {
        /*
         * Set up variables and call method under test
         */
        Set<String> q = this.constructorTest();
        Set<String> qExpected = this.createFromArgsRef("Red");
        /*
         * Call method under test
         */
        q.add("Red");
        /*
         * Assert that values of variables match expectations
         */
        assertEquals(qExpected, q);
    }

    @Test
    public final void testAddFromNonEmpty() {
        /*
         * Set up variables and call method under test
         */
        Set<String> q = this.createFromArgsTest("Red");
        Set<String> qExpected = this.createFromArgsRef("Blue", "Red");
        /*
         * Call method under test
         */
        q.add("Blue");
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
        Set<String> q = this.createFromArgsTest("Blue", "Red");
        Set<String> qExpected = this.createFromArgsRef("Red");
        /*
         * Call method under test
         */
        String test = q.remove("Blue");
        /*
         * Assert that values of variables match expectations
         */

        assertEquals("Blue", test);
        assertEquals(qExpected, q);
    }

    @Test
    public final void testRemoveBotFromNonEmpty() {
        /*
         * Set up variables and call method under test
         */
        Set<String> q = this.createFromArgsTest("Blue", "Red");
        Set<String> qExpected = this.createFromArgsRef("Blue");
        /*
         * Call method under test
         */
        String test = q.remove("Red");
        /*
         * Assert that values of variables match expectations
         */
        assertEquals("Red", test);
        assertEquals(qExpected, q);
    }

    @Test
    public final void testRemoveMidFromNonEmpty() {
        /*
         * Set up variables and call method under test
         */
        Set<String> q = this.createFromArgsTest("Blue", "Purple", "Red");
        Set<String> qExpected = this.createFromArgsRef("Blue", "Red");
        /*
         * Call method under test
         */
        String test = q.remove("Purple");
        /*
         * Assert that values of variables match expectations
         */
        assertEquals("Purple", test);
        assertEquals(qExpected, q);
    }

    @Test
    public final void testSizeEmpty() {
        /*
         * Set up variables and call method under test
         */
        Set<String> q = this.createFromArgsTest();
        Set<String> qExpected = this.createFromArgsRef();
        /*
         * Call method under test
         */
        int testLength = q.size();
        /*
         * Assert that values of variables match expectations
         */
        assertEquals(0, testLength);
        assertEquals(qExpected, q);
    }

    @Test
    public final void testSizeNonEmpty() {
        /*
         * Set up variables and call method under test
         */
        Set<String> q = this.createFromArgsTest("Blue", "Red");
        Set<String> qExpected = this.createFromArgsRef("Blue", "Red");
        /*
         * Call method under test
         */
        int testLength = q.size();
        /*
         * Assert that values of variables match expectations
         */
        assertEquals(2, testLength);
        assertEquals(qExpected, q);
    }

    @Test
    public final void testRemoveAnyNonEmpty() {
        /*
         * Set up variables and call method under test
         */
        Set<String> q = this.createFromArgsTest("Blue", "Red", "Purple");
        Set<String> qExpected = this.createFromArgsRef("Blue", "Red", "Purple");

        /*
         * Call method under test
         */
        String testRetVal = q.removeAny();
        assertEquals(true, qExpected.contains(testRetVal));
        qExpected.remove(testRetVal);

        /*
         * Assert that the sets are now equal
         */
        assertEquals(qExpected, q);
    }

    @Test
    public final void testContainsDoesNotContain() {
        /*
         * Set up variables and call method under test
         */
        Set<String> q = this.createFromArgsTest("Blue", "Red");
        Set<String> qExpected = this.createFromArgsRef("Blue", "Red");
        /*
         * Call method under test
         */
        assertTrue(!q.contains("Purple"));
        /*
         * Assert that values of variables match expectations
         */
        assertEquals(qExpected, q);
    }

    @Test
    public final void testContainsDoesContain() {
        /*
         * Set up variables and call method under test
         */
        Set<String> q = this.createFromArgsTest("Blue", "Red");
        Set<String> qExpected = this.createFromArgsRef("Blue", "Red");
        /*
         * Call method under test
         */
        assertTrue(q.contains("Blue"));
        /*
         * Assert that values of variables match expectations
         */
        assertEquals(qExpected, q);
    }
}