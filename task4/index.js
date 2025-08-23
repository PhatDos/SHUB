async function main() {
  const res = await fetch("https://share.shub.edu.vn/api/intern-test/input");
  const json = await res.json();

  const data = json.data;
  const queries = json.query;
  const token = json.token;

  // Build
  const build1 = buildSum(data);
  const build2 = buildDiffSum(data);

  // Xử lý
  const results = queries.map((q) => {
    const [l, r] = q.range;
    if (q.type === "1") {
      return rangeQuery(build1, l, r);
    } else if (q.type === "2") {
      return rangeQuery(build2, l, r);
    }
  });

  console.log("results", results);

  // POST results
  const outputRes = await fetch(
    "https://share.shub.edu.vn/api/intern-test/output",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(results)
    }
  );

  const outputJson = await outputRes.json();
  console.log(outputJson);

  return results;
}

// TYPE 1
function buildSum(arr) {
  const build = [0];
  for (let i = 0; i < arr.length; i++) {
    build.push(build[i] + arr[i]);
  }
  return build;
}

// TYPE 2
function buildDiffSum(arr) {
  const build = [0];
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 === 0) build.push(build[i] + arr[i]); // chẵn cộng lẻ trừ
    else build.push(build[i] - arr[i]);
  }
  return build;
}

// Dùng chung
function rangeQuery(build, l, r) {
  return build[r + 1] - build[l];
}

main();
