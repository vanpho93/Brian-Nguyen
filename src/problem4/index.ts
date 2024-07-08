// Complexity: O(n)
// Efficiency: Acceptable
function sum_to_n_a(n: number): number {
	let result = 0;
	for (let i = 1; i <= n; i++) {
		result += i;
	}
	return result;
}

// Complexity: O(1)
// Efficiency: Fastest way and it's the best way to do it
function sum_to_n_b(n: number): number {
	return n * (n + 1) / 2;
}

// Complexity: O(n)
// Efficiency: Just a fun way to do it, not recommended for production as recursion is much slower
function sum_to_n_c(n: number): number {
	if (n === 1) return 1;
	return n + sum_to_n_b(n - 1);
}
