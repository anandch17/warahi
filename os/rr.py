# a = [37, 130, 180, 144, 60, 89, 50, 155, 190]
# s = 0
# s1 = 0
# b = sorted(a)
# k = b.index(50)

# if (b[k] - b[k-1]) > (b[k+1] - b[k]):
#     for i in range(k, len(b)-1):
#         print("seek moves from", b[i], "to", b[i+1])
#         s += abs(b[i] - b[i+1])
#     for i in range(k-1, 0, -1):
#         print("seek moves from", b[i], "to", b[i-1])
#         s1 += abs(b[i] - b[i-1])
#     total = s + s1
# else:
#     for i in range(k-1, 0, -1):
#         print("seek moves from", b[i], "to", b[i-1])
#         s1 += abs(b[i] - b[i-1])
#     for i in range(k, len(b)-1):
#         print("seek moves from", b[i], "to", b[i+1])
#         s += abs(b[i] - b[i+1])
#     total = s + s1

# print("Total seek time:", total)

def calculate_seek_time(requests, start):
    total_seek_time = 0
    current_position = start
    requests = sorted(requests)  # Sort the requests
    
    while requests:
        # Find the closest request to the current position
        closest_request = min(requests, key=lambda x: abs(x - current_position))
        print(f"Seek moves from {current_position} to {closest_request}")
        total_seek_time += abs(current_position - closest_request)
        current_position = closest_request
        requests.remove(closest_request)
    
    return total_seek_time

# Initial list of requests and starting position
requests = [37, 130, 180, 144, 60, 89, 50, 155, 190]
start_position = 50

total_seek_time = calculate_seek_time(requests, start_position)
print(f"Total seek time: {total_seek_time}")
