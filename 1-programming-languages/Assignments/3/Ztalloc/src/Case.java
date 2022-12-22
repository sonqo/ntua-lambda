public class Case{

    public String path;
    public int low_b, high_b, state;

    public Case(){
    }

    public Case(int low_b, int high_b, String path, int state){

        this.low_b = low_b; this.high_b = high_b; this.state = state;
        this.path = path;

    }
}