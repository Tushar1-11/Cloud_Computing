import matplotlib.pyplot as plt

tests = ['Load Test', 'Spike Test']
failure = [3, 7]

plt.figure()
plt.bar(tests, failure)

plt.xlabel("Test Type")
plt.ylabel("Failure Rate (%)")
plt.title("Failure Rate Comparison")

plt.savefig("failure_bar.png")
plt.show()