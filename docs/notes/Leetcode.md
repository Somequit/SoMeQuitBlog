# 题目

* Problem: [100241. 求出所有子序列的能量和](https://leetcode.cn/problems/find-the-sum-of-the-power-of-all-subsequences/description/)
* 给你一个长度为 n 的整数数组 nums 和一个 正 整数 k 。
* 一个整数数组的 能量 定义为和 等于 k 的子序列的数目。
* 请你返回 nums 中所有子序列的 能量和 。
* 由于答案可能很大，请你将它对 10 ^ 9 + 7 取余 后返回。
* 1 <= n <= 100
* 1 <= nums[i] <= 10 ^ 4
* 1 <= k <= 100

# 思路

## Java + 数学 + 01背包变种

## 第一步：
* 首先题目意思是求子序列的子序列和为 k 的总个数，
* 接着为了保证数据不重不漏，可以按照公式求：
* 选 l 个元素和为 k 的所有可能性个数 * 剩下 n - l 个元素选或不选的所有可能性个数。
* 最后由于元素均为正整数，因此枚举 l 为 [1, k] 即可

## 第二步：
* 选 l 个元素和为 k 的所有可能性个数，
* 假设忽略 l 个元素，即序列和为 k 的个数，直接套用 01 背包，
    * dp[i][j] 代表前 i 个元素和为 j 的总个数
    * dp[i][j] = dp[i-1][j-nums[l]]，nums[l] <= j <= k
    * 空间优化掉 i，倒序遍历 j 即可
* 然后添加一维 l 代表选 l 个元素，最后结果就是 dp[l][k]
    * 可看做 dp[i][l][j] 代表前 i 个元素选择 l 个元素和为 j 的总个数
    * dp[i][l][j] = dp[i-1][l-1][j-nums[l]]，nums[l] <= j <= k（代表选择 nums[l] 这个元素）
    * 空间优化掉 i，倒序遍历 j 即可

## 第三步：
* 剩下 n-l 个元素选或不选的所有可能性个数，
* 假设 l=1 即选择的元素就是 k，
* 此时 n-1 个元素就有 2^(n-1) 种可能性（参考实例 1），
* 最后注意使用带 mod 的快速幂

# 复杂度

时间复杂度:
> 时间复杂度： $O(nk^2)$

空间复杂度:
> 空间复杂度： $O(k^2)$



# Code
```Java []
class Solution {
    /**
     * Java + 数学 + 01背包变种
     *
     * 第一步：
     * 首先题目意思是求子序列的子序列和为 k 的总个数，
     * 接着为了保证数据不重不漏，可以按照公式求：
     * 选 l 个元素和为 k 的所有可能性个数 * 剩下 n - l 个元素选或不选的所有可能性个数。
     * 最后由于元素均为正整数，因此枚举 l 为 [1, k] 即可
     *
     * 第二步：
     * 选 l 个元素和为 k 的所有可能性个数，
     * 假设忽略 l 个元素，即序列和为 k 的个数，直接套用 01 背包，
     *     * dp[i][j] 代表前 i 个元素和为 j 的总个数
     *     * dp[i][j] = dp[i-1][j-nums[l]]，nums[l] <= j <= k
     *     * 空间优化掉 i，倒序遍历 j 即可
     * 然后添加一维 l 代表选 l 个元素，最后结果就是 dp[l][k]
     *     * 可看做 dp[i][l][j] 代表前 i 个元素选择 l 个元素和为 j 的总个数
     *     * dp[i][l][j] = dp[i-1][l-1][j-nums[l]]，nums[l] <= j <= k（代表选择 nums[l] 这个元素）
     *     * 空间优化掉 i，倒序遍历 j 即可
     *
     * 第三步：
     * 剩下 n-l 个元素选或不选的所有可能性个数，
     * 假设 l=1 即选择的元素就是 k，
     * 此时 n-1 个元素就有 2^(n-1) 种可能性（参考实例 1），
     * 最后注意使用带 mod 的快速幂
     *
     * 时间复杂度：O（nk^2），空间复杂度：O（k^2）
     */
    public int sumOfPower(int[] nums, int k) {
        int mod = 1_000_000_007;

        int n = nums.length;

        // 排序让大于 k 的元素直接返回
        Arrays.sort(nums);
        // 01 背包变种（空间优化后），dp[l][j] 代表选 l 个元素和为 j 的所有可能性个数
        long[][] dp = new long[k + 1][k + 1];
        // 不选任何元素总和为 0 才需要初始化
        dp[0][0] = 1;
        for (int i = 0; i < n && nums[i] <= k; i++) {

            // 01 背包空间优化需要倒序
            for (int j = k; j >= nums[i]; j--) {
                for (int l = 1; l < k + 1; l++) {
                    dp[l][j] += dp[l - 1][j - nums[i]];
                    dp[l][j] %= mod;
                }
            }

        }

        long res = 0L;
        // 选 l 个元素总和为 k
        for (int l = 1; l <= k; l++) {
            // 选 l 个元素和为 k 的所有可能性个数 * 剩下 n - l 个元素选或不选的所有可能性个数 *
            res += dp[l][k] * qPow(2L, n - l, mod);
            res %= mod;
        }

        return (int) (res % mod);

    }

    private long qPow(long value, long pow, long mod) {
        long res = 1;
        while (pow > 0) {
            if ((pow & 1) == 1) {
                res *= value;
                res %= mod;
            }

            value *= value;
            value %= mod;
            pow >>= 1;
        }
        return res;
    }
}
```