from models.lane import Lane

class Intersection:

    def __init__(self,name):
        self.name = name


        self.lanes = {
                        "north":Lane("north"),
                        "south":Lane("south"),
                        "east" :Lane("east"),
                        "west" :Lane("west")
                     }

        self.current_green = "north"

    def add_vehicle(self,vehicle):
        self.lanes[vehicle.lane].add_vehicle(vehicle)

    def select_next_lane(self):
        for lane in self.lanes.values():
            if lane.has_ambulance():
                return lane.name
            
        return max(self.lanes.values(),key=lambda l:l.size()).name
    
    def step(self):
        self.current_green = self.select_next_lane()

        for lane_name, lane in self.lanes.items():
            for i, v in enumerate(lane.queue):

                if i == 0:
                    if lane_name == self.current_green or v.type == "ambulance":
                        v.position += 1
        
        lane = self.lanes[self.current_green]
        if lane.queue and lane.queue[0].position > 20:
            lane.queue.popleft()
        
        return {
            "current_green": self.current_green
        }

    def get_state(self):
        return {
            "lanes":{
                name:[
                    {"type": v.type, "pos":v.position}
                    for v in lane.queue
                ]
                for name, lane in self.lanes.items()
            },
            "current_green":self.current_green
        }