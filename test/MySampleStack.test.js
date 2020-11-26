import { expect, matchTemplate, MatchStyle } from "@aws-cdk/assert";
import * as sst from "@serverless-stack/resources";
import MySampleStack from "../lib/MySampleStack";

test('MySampleStack', () => {
  const app = new sst.App();
  // WHEN
  const stack = new MySampleStack(app, 'test-stack');
  // THEN
  expect(stack).to(matchTemplate({
    "Resources": {}
  }, MatchStyle.EXACT))
});
