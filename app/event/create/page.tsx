import "./event-create.css"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

/*

TODO:

style page
link user inputs to firebase
have calendar route to this page (once calendar is done)

*/

export default function CreateEvent() {

    return (

        <Card>
            <CardHeader>
                <CardTitle>Create Event</CardTitle>
            </CardHeader>

            <CardContent>
                <form>
                    <div>
                        <Label>Event Name</Label>
                        <Input placeholder="My Event"></Input>
                    </div>

                    <div>
                        <Label>Event Description</Label>
                        <Textarea placeholder="My event description"></Textarea>
                    </div>

                    <div>
                        <Label>Event Date</Label>
                        <Input type="date"></Input>
                    </div>

                    <div>
                        <Label>Event Time</Label>
                        <Input type="time"></Input>
                    </div>

                    <div>
                        <Label>Event Location</Label>
                        <Input placeholder="My Event Location"></Input>
                    </div>
                </form>
            </CardContent>

            <CardFooter>
                <Button>Cancel</Button>
                <Button>Create Event</Button>
            </CardFooter>
        </Card>

    );

}
