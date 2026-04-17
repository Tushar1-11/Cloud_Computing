import matplotlib.pyplot as plt

labels = ['Success', 'Failure']
values = [1164, 36]

plt.figure()

plt.pie(values, labels=labels, autopct='%1.1f%%')
plt.title("Request Outcome Distribution")

plt.savefig("pie_chart.png")
plt.show()