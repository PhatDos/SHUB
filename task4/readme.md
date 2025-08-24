## Guidance to execute the program:

Make sure you have already installed Node JS

Open your terminal, navigate to the project folder:

    cd task4

And run:

    node index.js

This will start the application.

## Idea

To answer queries efficiently, it is not feasible to calculate each query directly because the perplexity would be larger than O(n + q). Instead, we use the technique of Prefix sums to quickly compute the sum of segments.

### Type 1 (Sum of all)

We need to calculate the sum of all elements and stored it:

    const build = [0];
    for (let i = 0; i < arr.length; i++) {
        build.push(build[i] + arr[i]);
    }

When calculating the sum for the segment `[l, r]`:

    sum = build1[r+1] - build1[l]

### Type 2

The sum according to the alternating addition and subtraction formula over the segment `[l,r]`:

    const build = [0];
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 0) build.push(build[i] + arr[i]); //even
        else build.push(build[i] - arr[i]);  //odd
    }

When retrieving the segment `[l, r]`, the alternating sum calculation is the same as Type 1 but with different stored array:

    sum = build2[r+1] - build2[l]

## Solve step by step

- **Step 1**: Fetch API with GET method and converse type of data
- **Step 2**: Build Prefix sum for Type 1 and Type 2
- **Step 3**: Loop through each queries and call function rangeQuery()
- **Step 4**: Stored result into an array
- **Step 5**: Send the results to the API with the accompanying token and check the API response in the console.

### Advantages

- Optimizes query response time from O(n*q) to O(n+q) after building prefix sums in O(n).
