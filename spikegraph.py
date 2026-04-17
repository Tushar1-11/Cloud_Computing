import matplotlib.pyplot as plt

time = list(range(10))

rps = [1, 3, 5, 10, 20, 29, 25, 10, 3, 1]
response_time = [950, 1000, 1100, 1300, 1500, 1235, 1200, 1100, 1000, 900]
failure_rate = [1, 2, 3, 4, 6, 7, 6, 4, 2, 1]

plt.figure()

plt.plot(time, rps, marker='o', label="RPS")
plt.plot(time, response_time, marker='s', label="Response Time (ms)")
plt.plot(time, failure_rate, marker='x', label="Failure Rate (%)")

plt.xlabel("Time")
plt.ylabel("Values")
plt.title("Spike Test Performance (Sudden Traffic)")
plt.legend()
plt.grid()

plt.savefig("spike_test_graph.png")
plt.show()