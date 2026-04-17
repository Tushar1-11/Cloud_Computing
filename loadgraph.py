import matplotlib.pyplot as plt

time = list(range(10))

rps = [2, 5, 8, 12, 15, 18, 22, 25, 20, 5]
response_time = [900, 950, 1000, 1050, 1100, 1080, 1150, 1166, 1100, 1000]
failure_rate = [1, 1, 2, 2, 3, 3, 3, 3, 2, 1]

plt.figure()

plt.plot(time, rps, marker='o', label="RPS")
plt.plot(time, response_time, marker='s', label="Response Time (ms)")
plt.plot(time, failure_rate, marker='x', label="Failure Rate (%)")

plt.xlabel("Time")
plt.ylabel("Values")
plt.title("Load Test Performance (Gradual Increase)")
plt.legend()
plt.grid()

plt.savefig("load_test_graph.png")
plt.show()